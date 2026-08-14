from pydantic import BaseModel, Field


class SchoolResponse(BaseModel):
    id: int
    name: str
    code: str
    is_active: bool

    model_config = {"from_attributes": True}


class SchoolCreateRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=150)
    code: str = Field(..., min_length=1, max_length=50)
