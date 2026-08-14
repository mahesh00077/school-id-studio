from pydantic import BaseModel, EmailStr, Field


class SchoolAdminCreateRequest(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class SchoolAdminResponse(BaseModel):
    id: int
    school_id: int
    name: str
    email: str
    role: str
    is_active: bool