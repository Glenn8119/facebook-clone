import _axios from '@/api/_axios'
import {
  createPostResponseSchema,
  getPostResponseSchema,
  type FECreatePostResponseType,
  type FEGetPostResponseType
} from '@/api/post/schema'
import { type PostFormType } from '@/schema/validation/add-post'
import { transformObjectKeyFromSnakeToCamel } from '@/utils/formatter'

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
  }
}

export default PostApi
