import Avatar from '@/components/Avatar'
import Modal from '@/components/Modal'
import Button from '@/components/form/Button'
import ErrorMessage from '@/components/form/ErrorMessage'
import TextArea from '@/components/form/TextArea'
import useCreatePost from '@/hooks/api/mutation/useAddPost'
import useForm from '@/hooks/useForm'
import useUserContext from '@/hooks/useUserContext'
import { PostFormType, postFormSchema } from '@/schema/validation/add-post'
import { ButtonSize } from '@/types/component/button'
import { ChangeEvent, FC, MouseEvent } from 'react'

type AddPostModalProps = {
  closeModal: () => void
}

const AddPostModal: FC<AddPostModalProps> = ({ closeModal }) => {
  const {
    value: { name }
  } = useUserContext()

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

  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLTextAreaElement

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    submit()
  }

  return (
    <Modal onCloseModal={closeModal}>
      <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
        建立貼文
      </div>
      <div className='flex flex-col p-4 h-92'>
        <div className='flex mb-2'>
          <Avatar className='mr-2' />
          <span>{name}</span>
        </div>
        <TextArea
          error={!!error?.content}
          value={formData.content}
          onChange={onTextAreaChange}
          name='content'
          className='resize-none w-full text-2xl flex-grow mb-2 focus-visible:outline-none'
          placeholder={`${name}，在想些什麼？`}
        />
        <ErrorMessage messageList={error?.content?._errors} />
        <Button
          size={ButtonSize.SMALL}
          onClick={onButtonClick}
          disabled={!formData.content}
        >
          發布
        </Button>
      </div>
    </Modal>
  )
}

export default AddPostModal
