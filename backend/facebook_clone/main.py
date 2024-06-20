from fastapi import FastAPI
from facebook_clone.endpoint import auth, post, friend, user, group, comment
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


app.include_router(auth.router, prefix='/auth', tags=['auth'])
app.include_router(post.router, prefix='/post', tags=['post'])
app.include_router(friend.router, prefix='/friend', tags=['friend'])
app.include_router(user.router, prefix='/user', tags=['user'])

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)
