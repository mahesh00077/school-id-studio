from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SchoolCreateRequest(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    code: str = Field(min_length=1, max_length=50)


class SchoolUpdateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    code: str | None = Field(default=None, min_length=1, max_length=50)
    is_active: bool | None = None


class SchoolResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    code: str
    is_active: bool
    created_at: datetime
    updated_at: datetime