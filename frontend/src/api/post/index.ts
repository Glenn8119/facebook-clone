import _axios from '@/api/_axios'
import {
  FEEditPostResponseType,
  createPostResponseSchema,
  editPostResponseSchema,
  getPostResponseSchema,
  type FECreatePostResponseType,
  type FEGetPostResponseType
} from '@/api/post/schema'

import { type PostFormType } from '@/schema/validation/add-post'

import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter/schema'

const PostApi = {
  async createPost({
    content
  }: PostFormType): Promise<FECreatePostResponseType> {
    const res = await _axios({
      url: '/post',
      method: 'POST',
      body: {
        content
      },
      responseSchema: createPostResponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async editPost({
    postId,
    content
  }: {
    postId: string
    content: string
  }): Promise<FEEditPostResponseType> {
    const res = await _axios({
      url: `/post/${postId}`,
      method: 'PUT',
      body: {
        content
      },
      responseSchema: editPostResponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async deletePost(postId: string): Promise<void> {
    const res = await _axios({
      url: `/post/${postId}`,
      method: 'DELETE'
    })

    transformObjectKeyFromSnakeToCamel(res)
  },

  async getPostList(): Promise<FEGetPostResponseType> {
    const res = await _axios({
      url: '/post/list',
      responseSchema: getPostResponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async getPostListByUserId(userId: string): Promise<FEGetPostResponseType> {
    const res = await _axios({
      url: `/post/list/${userId}`,
      responseSchema: getPostResponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async deletePostComment({
    commentId
  }: {
    postId: string
    commentId: string
  }): Promise<void> {
    await _axios({
      url: `/post/comment/${commentId}`,
      method: 'DELETE'
    })
  },

  async createPostComment({
    postId,
    content
  }: {
    postId: string
    content: string
  }): Promise<void> {
    await _axios({
      url: `/post/${postId}/comment`,
      method: 'POST',
      body: {
        content
      }
    })
  },

  async editPostComment({
    commentId,
    content
  }: {
    postId: string
    commentId: string
    content: string
  }): Promise<void> {
    await _axios({
      url: `/post/comment/${commentId}`,
      method: 'PUT',
      body: {
        content
      }
    })
  },

  async likePost(postId: string): Promise<void> {
    await _axios({
      url: `/post/${postId}/like`,
      method: 'POST'
    })
  },

  async unlikePost(postId: string): Promise<void> {
    await _axios({
      url: `/post/${postId}/unlike`,
      method: 'POST'
    })
  }
}

export default PostApi
