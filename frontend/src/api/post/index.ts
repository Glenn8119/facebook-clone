import _axios from '@/api/_axios'
import {
  createPostResponseSchema,
  getPostResponseSchema,
  type FECreatePostResponseType,
  type FEGetPostResponseType
} from '@/api/post/schema'
import {
  type PostFormType,
  type PostCommentFormType
} from '@/schema/validation/add-post'
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

  async getPostList(): Promise<FEGetPostResponseType> {
    const res = await _axios({
      url: '/post/list',
      responseSchema: getPostResponseSchema
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async createPostComment({
    postId,
    content
  }: PostCommentFormType): Promise<FEGetPostResponseType> {
    const res = await _axios({
      url: `/post/${postId}/comment`,
      method: 'POST',
      responseSchema: getPostResponseSchema,
      body: {
        content
      }
    })

    return transformObjectKeyFromSnakeToCamel(res)
  },

  async likePost(postId: string) {
    await _axios({
      url: `/post/${postId}/like`,
      method: 'POST',
      responseSchema: getPostResponseSchema
    })
  },

  async unlikePost(postId: string) {
    await _axios({
      url: `/post/${postId}/unlike`,
      method: 'POST'
    })
  }
}

export default PostApi
