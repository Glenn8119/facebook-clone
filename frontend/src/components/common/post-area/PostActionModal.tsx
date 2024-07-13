import { ChangeEvent, FC } from 'react'

import Avatar from '@/components/Avatar'
import Modal from '@/components/Modal'
import Button from '@/components/form/Button'
import ErrorMessage from '@/components/form/ErrorMessage'
import TextArea from '@/components/form/TextArea'

import { AnyFunction } from '@/types/common'
import { ButtonSize } from '@/types/component/button'
import useUserContext from '@/hooks/useUserContext'

type PostActionModalProps = {
  title: string
  buttonLabel: string
  textAreaValue: string
  isError: boolean
  closeModal: AnyFunction
  onSubmit: AnyFunction
  onTextAreaChange: AnyFunction
  errorMessageList?: string[]
}

const PostActionModal: FC<PostActionModalProps> = ({
  title,
  buttonLabel,
  textAreaValue,
  isError,
  closeModal,
  onSubmit,
  onTextAreaChange,
  errorMessageList
}) => {
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onTextAreaChange(e.target.value)
  }

  const {
    value: { name }
  } = useUserContext()

  return (
    <Modal onCloseModal={closeModal}>
      <div className='h-15 p-4 text-center font-semibold text-xl border-b'>
        {title}
      </div>
      <div className='flex flex-col p-4 h-92'>
        <div className='flex mb-2'>
          <Avatar className='mr-2' />
          <span>{name}</span>
        </div>
        <TextArea
          error={isError}
          value={textAreaValue}
          onChange={handleTextAreaChange}
          name='content'
          className='resize-none w-full text-2xl flex-grow mb-2 focus-visible:outline-none'
          placeholder={`${name}，在想些什麼？`}
        />
        <ErrorMessage messageList={errorMessageList} />
        <Button
          size={ButtonSize.SMALL}
          onClick={onSubmit}
          disabled={!textAreaValue}
        >
          {buttonLabel}
        </Button>
      </div>
    </Modal>
  )
}

export default PostActionModal
