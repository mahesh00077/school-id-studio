"""Owner-facing school management API routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session as DBSession

from app.api.auth import require_owner
from app.core.database import get_db
from app.models.school import School
from app.models.user import User
from app.schemas.school import SchoolCreateRequest, SchoolResponse

router = APIRouter(prefix="/schools", tags=["owner schools"])


@router.get("", response_model=list[SchoolResponse])
def list_schools(
    db: DBSession = Depends(get_db),
    _owner: User = Depends(require_owner),
) -> list[School]:
    stmt = select(School).order_by(School.created_at.desc())
    return list(db.execute(stmt).scalars().all())


@router.post("", response_model=SchoolResponse, status_code=status.HTTP_201_CREATED)
def create_school(
    body: SchoolCreateRequest,
    db: DBSession = Depends(get_db),
    _owner: User = Depends(require_owner),
) -> School:
    existing = db.execute(select(School).where(School.code == body.code)).scalar_one_or_none()
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A school with this code already exists",
        )

    school = School(name=body.name, code=body.code)
    db.add(school)
    db.commit()
    db.refresh(school)
    return school
