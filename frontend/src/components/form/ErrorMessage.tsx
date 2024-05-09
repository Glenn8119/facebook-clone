import { FC } from 'react'

type ErrorMessageProps = {
  messageList?: string[]
}

const ErrorMessage: FC<ErrorMessageProps> = ({ messageList }) => {
  if (!messageList) {
    return null
  }

  return (
    <>
      {messageList.map((message) => (
        <div key={message} className='text-red-500'>
          {message}
        </div>
      ))}
    </>
  )
}

export default ErrorMessage
