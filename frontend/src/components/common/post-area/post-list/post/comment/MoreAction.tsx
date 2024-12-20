import { AnyFunction } from '@/types/common'
import { FC } from 'react'

type MoreActionProps = {
  handleEdit: AnyFunction
  handleDelete: AnyFunction
}

const MoreAction: FC<MoreActionProps> = ({ handleEdit, handleDelete }) => {
  return (
    <div className='w-60'>
      <div
        className='hover:bg-slate-100 p-1 px-2 cursor-pointer rounded'
        onClick={handleEdit}
      >
        編輯
      </div>
      <div
        className='hover:bg-slate-100 p-1 px-2 cursor-pointer rounded'
        onClick={handleDelete}
      >
        刪除
      </div>
    </div>
  )
}

export default MoreAction
