from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import Any


def to_json_response(response: any) -> JSONResponse:
    content = jsonable_encoder(response)
    return JSONResponse(content=content)
