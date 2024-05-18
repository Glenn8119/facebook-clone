import Avatar from '@/components/Avatar'
import Mask from '@/components/Mask'
import Button from '@/components/form/Button'
import ErrorMessage from '@/components/form/ErrorMessage'
import TextArea from '@/components/form/TextArea'
import useForm from '@/hooks/useForm'
import { PostFormType, postFormSchema } from '@/schema/validation/add-post'
import { ButtonSize } from '@/types/component/input'
import { ChangeEvent, FC } from 'react'
import { MdClose } from 'react-icons/md'

interface AddPostModalProps {
  closeModal: () => void
}

const AddPostModal: FC<AddPostModalProps> = ({ closeModal }) => {
  const onSubmit = async (formData: PostFormType) => {
    console.log('formData', formData)
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

  return (
    <Mask>
      <div className='relative w-125 h-107 bg-white rounded shadow-lg'>
        <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
          建立貼文
        </div>
        <div className='flex flex-col p-4 h-92'>
          <div className='flex mb-2'>
            <Avatar className='mr-2' />
            <span>Username </span>
          </div>
          <TextArea
            error={!!error?.content}
            value={formData.content}
            onChange={onTextAreaChange}
            name='content'
            className='resize-none w-full text-2xl flex-grow mb-2 focus-visible:outline-none'
            placeholder='Username，在想些什麼？'
          />
          <ErrorMessage messageList={error?.content?._errors} />
          <Button
            size={ButtonSize.SMALL}
            onClick={submit}
            disabled={!formData.content}
          >
            發布
          </Button>
        </div>
        <MdClose
          size={24}
          className='absolute top-4 right-4 cursor-pointer'
          onClick={closeModal}
        />
      </div>
    </Mask>
  )
}

export default AddPostModal
