from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Generic, TypeVar, List, Any


def to_json_response(response: Any) -> JSONResponse:
    content = jsonable_encoder(response)
    return JSONResponse(content=content)


RESULT = TypeVar('RESULT')


class PageResponse(BaseModel, Generic[RESULT]):
    page: int
    total: int
    page_size: int
    result: List[RESULT]
