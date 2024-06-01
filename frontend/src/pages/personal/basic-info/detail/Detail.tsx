import Avatar from '@/components/Avatar'
import CollapsingAvatarList from '@/components/common/collapsing-avatar-list/CollapsingAvatarList'
import Button from '@/components/form/Button'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { MdEdit } from 'react-icons/md'

const mockAvatarInfoList = [{}, {}, {}, {}, {}, {}, {}]

const Detail = () => {
  return (
    <div className='flex items-end h-36 relative pb-4 border-b border-slate-300'>
      <div className='absolute bottom-4 left-0 border-white border-4 rounded-full'>
        <Avatar className='w-40 h-40' />
      </div>
      <div className='basis-44' />
      <div className='flex-grow py-2'>
        <div className='font-bold text-4xl mb-1'>Username</div>
        <div className='text-slate-600 mb-1'>222 位朋友</div>
        <CollapsingAvatarList avatarInfoList={mockAvatarInfoList} />
      </div>
      <div className='flex-grow py-2'>
        <Button
          size={ButtonSize.SMALL}
          className='w-auto px-4'
          variant={ButtonVariant.AUXILIARY}
          IconElement={MdEdit}
        >
          編輯個人檔案
        </Button>
      </div>
    </div>
  )
}

export default Detail
