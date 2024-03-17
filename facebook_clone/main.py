from fastapi import FastAPI
from facebook_clone.endpoint import user, post, group, comment

app = FastAPI()

app.include_router(user.router, prefix='/user', tags=['user'])


@app.get('/')
async def greet():
    return {'hello': 'world'}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)
