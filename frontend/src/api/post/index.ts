import _axios from '@/api/_axios'
import {
  createPostResponseSchema,
  getPostResponseSchema,
  type CreatePostResponseType,
  type GetPostResponseType
} from '@/api/post/schema'
import { type PostFormType } from '@/schema/validation/add-post'

const PostApi = {
  async createPost({ content }: PostFormType): Promise<CreatePostResponseType> {
    return await _axios({
      url: '/post',
      method: 'POST',
      body: {
        content
      },
      responseSchema: createPostResponseSchema
    })
  },

  async getPostList(): Promise<GetPostResponseType> {
    return _axios({
      url: '/post',
      responseSchema: getPostResponseSchema
    })
  }
}

export default PostApi
