import PostActionModal from '@/components/common/post-area/PostActionModal'

import useCreatePost from '@/hooks/api/mutation/useAddPost'
import useForm from '@/hooks/useForm'
import { PostFormType, postFormSchema } from '@/schema/validation/add-post'
import { FC, MouseEvent } from 'react'

type AddPostModalProps = {
  closeModal: () => void
}

const AddPostModal: FC<AddPostModalProps> = ({ closeModal }) => {
  const { createPost } = useCreatePost()

  const onSubmit = async (formData: PostFormType) => {
    await createPost(formData)
    closeModal()
  }

  const { formData, setFormData, submit, error } = useForm(
    { content: '' },
    postFormSchema,
    onSubmit
  )

  const onTextAreaChange = (value: string) => {
    setFormData({
      content: value
    })
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    submit()
  }

  return (
    <PostActionModal
      buttonLabel='發布'
      title='建立貼文'
      isError={!!error?.content}
      textAreaValue={formData.content}
      errorMessageList={error?.content?._errors}
      closeModal={closeModal}
      onSubmit={handleSubmit}
      onTextAreaChange={onTextAreaChange}
    />
  )
}

export default AddPostModal
