import _axios from '@/api/_axios'
import { postResponseSchema, type PostResponseType } from '@/api/post/schema'
import { type PostFormType } from '@/schema/validation/add-post'

const PostApi = {
  async createPost({ content }: PostFormType): Promise<PostResponseType> {
    return await _axios({
      url: '/post',
      method: 'POST',
      body: {
        content
      },
      responseSchema: postResponseSchema
    })
  },

  async getPostList() {
    return _axios({
      url: '/post',
      responseSchema: postResponseSchema
    })
  }
}

export default PostApi
