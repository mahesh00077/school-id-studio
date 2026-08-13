"""Authentication API routes and dependencies.

Cookie-based database sessions — no JWT, no localStorage.
"""

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session as DBSession

from app.core.database import get_db
from app.core.security import verify_password
from app.models.user import User, UserRole
from app.schemas.auth import LoginRequest, LogoutResponse, UserResponse
from app.services.session_service import (
    SESSION_COOKIE_NAME,
    create_session,
    delete_session,
    get_cookie_params,
    get_session,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def _user_response(user: User) -> UserResponse:
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role.value if isinstance(user.role, UserRole) else user.role,
        school_id=user.school_id,
    )


def get_current_user(
    session_token: str | None = Cookie(default=None, alias=SESSION_COOKIE_NAME),
    db: DBSession = Depends(get_db),
) -> User:
    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    session = get_session(db, session_token)
    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    user = session.user
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    return user


def require_owner(user: User = Depends(get_current_user)) -> User:
    if user.role != UserRole.OWNER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return user


def require_school_admin(user: User = Depends(get_current_user)) -> User:
    if user.role not in (UserRole.OWNER, UserRole.SCHOOL_ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return user


def require_school_staff(user: User = Depends(get_current_user)) -> User:
    if user.role not in (UserRole.OWNER, UserRole.SCHOOL_ADMIN, UserRole.SCHOOL_STAFF):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return user


@router.post("/login", response_model=UserResponse)
def login(body: LoginRequest, response: Response, db: DBSession = Depends(get_db)) -> UserResponse:
    email = body.email.strip().lower()

    stmt = select(User).where(User.email == email)
    user = db.execute(stmt).scalar_one_or_none()

    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(body.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    _, raw_token = create_session(db, user)

    cookie_params = get_cookie_params()
    response.set_cookie(value=raw_token, **cookie_params)

    return _user_response(user)


@router.get("/me", response_model=UserResponse)
def me(user: User = Depends(get_current_user)) -> UserResponse:
    return _user_response(user)


@router.post("/logout", response_model=LogoutResponse)
def logout(
    response: Response,
    session_token: str | None = Cookie(default=None, alias=SESSION_COOKIE_NAME),
    db: DBSession = Depends(get_db),
) -> LogoutResponse:
    if session_token:
        delete_session(db, session_token)

    response.delete_cookie(
        key=SESSION_COOKIE_NAME,
        path="/",
        samesite="lax",
        httponly=True,
        secure=False,
    )

    return LogoutResponse(message="Logged out")
