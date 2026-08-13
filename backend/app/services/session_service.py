"""Database-backed session service.

Sessions use a cryptographically secure random token (``secrets.token_urlsafe``).
Only a SHA-256 hash of the token is persisted to MySQL; the raw token is sent
to the browser exclusively as an HTTP-only cookie.

No JWT, no localStorage, no raw-token storage.
"""

from __future__ import annotations

import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session as DBSession

from app.models.session import Session
from app.models.user import User

SESSION_COOKIE_NAME = "session"
SESSION_TTL_DAYS = 7
TOKEN_BYTES = 32


def _hash_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


def generate_session_token() -> str:
    return secrets.token_urlsafe(TOKEN_BYTES)


def create_session(
    db: DBSession,
    user: User,
    *,
    ttl_days: int = SESSION_TTL_DAYS,
) -> tuple[Session, str]:
    raw_token = generate_session_token()
    token_hash = _hash_token(raw_token)
    expires_at = datetime.now(timezone.utc) + timedelta(days=ttl_days)

    session = Session(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=expires_at.replace(tzinfo=None),
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session, raw_token


def get_session(db: DBSession, raw_token: str) -> Session | None:
    if not raw_token:
        return None

    token_hash = _hash_token(raw_token)
    stmt = select(Session).where(Session.token_hash == token_hash)
    session = db.execute(stmt).scalar_one_or_none()
    if session is None:
        return None

    if session.expires_at <= datetime.utcnow():
        return None

    if not session.user.is_active:
        return None

    return session


def get_session_user(db: DBSession, raw_token: str) -> User | None:
    session = get_session(db, raw_token)
    if session is None:
        return None
    return session.user


def delete_session(db: DBSession, raw_token: str) -> bool:
    if not raw_token:
        return False

    token_hash = _hash_token(raw_token)
    stmt = select(Session).where(Session.token_hash == token_hash)
    session = db.execute(stmt).scalar_one_or_none()
    if session is None:
        return False

    db.delete(session)
    db.commit()
    return True


def delete_all_user_sessions(db: DBSession, user_id: int) -> int:
    stmt = select(Session).where(Session.user_id == user_id)
    sessions = db.execute(stmt).scalars().all()
    count = len(sessions)
    for session in sessions:
        db.delete(session)
    db.commit()
    return count


def get_cookie_params() -> dict:
    return {
        "key": SESSION_COOKIE_NAME,
        "httponly": True,
        "secure": False,
        "samesite": "lax",
        "path": "/",
        "max_age": SESSION_TTL_DAYS * 24 * 60 * 60,
    }
