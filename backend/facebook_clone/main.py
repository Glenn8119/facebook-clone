from fastapi import FastAPI
from facebook_clone.endpoint import user, post, group, comment
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origin_list = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router, prefix='/user', tags=['user'])
app.include_router(post.router, prefix='/post', tags=['post'])

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)
