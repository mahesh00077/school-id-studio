from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.auth import require_owner
from app.models.school import School
from app.models.user import User
from app.schemas.school import SchoolCreateRequest, SchoolResponse
from app.core.security import hash_password
from app.models.user import UserRole
from app.schemas.school_admin import (
    SchoolAdminCreateRequest,
    SchoolAdminResponse,
)


router = APIRouter(
    prefix="/owner/schools",
    tags=["Owner Schools"],
)


@router.get(
    "",
    response_model=list[SchoolResponse],
)
def get_schools(
    current_user: User = Depends(require_owner),
    db: Session = Depends(get_db),
):
    schools = db.scalars(
        select(School).order_by(School.id.desc())
    ).all()

    return schools


@router.post(
    "",
    response_model=SchoolResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_school(
    data: SchoolCreateRequest,
    current_user: User = Depends(require_owner),
    db: Session = Depends(get_db),
):
    name = data.name.strip()
    code = data.code.strip().upper()

    if not name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="School name is required",
        )

    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="School code is required",
        )

    existing_school = db.scalar(
        select(School).where(School.code == code)
    )

    if existing_school:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="School code already exists",
        )

    school = School(
        name=name,
        code=code,
        is_active=True,
    )

    db.add(school)

    try:
        db.commit()
        db.refresh(school)
    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="School code already exists",
        )

    return school


@router.post(
    "/{school_id}/admin",
    response_model=SchoolAdminResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_school_admin(
    school_id: int,
    data: SchoolAdminCreateRequest,
    current_user: User = Depends(require_owner),
    db: Session = Depends(get_db),
):
    school = db.get(School, school_id)

    if not school:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="School not found",
        )

    if not school.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create admin for an inactive school",
        )

    email = str(data.email).strip().lower()

    existing_user = db.scalar(
        select(User).where(User.email == email)
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists",
        )

    existing_admin = db.scalar(
        select(User).where(
            User.school_id == school_id,
            User.role == UserRole.SCHOOL_ADMIN,
            User.is_active.is_(True),
        )
    )

    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This school already has an active school admin",
        )

    admin = User(
        school_id=school_id,
        name=data.name.strip(),
        email=email,
        password_hash=hash_password(data.password),
        role=UserRole.SCHOOL_ADMIN,
        is_active=True,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return admin