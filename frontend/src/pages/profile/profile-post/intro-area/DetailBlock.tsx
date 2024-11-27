import Button from '@/components/form/Button'
import { ButtonSize, ButtonVariant } from '@/types/component/button'
import { FC } from 'react'
import { MdLocationOn, MdWorkOutline, MdHouse } from 'react-icons/md'

type DetailBlockProps = {
  isSelf: boolean
  currentResidence: string
  company: string
  hometown: string
}

const DetailBlock: FC<DetailBlockProps> = ({
  isSelf,
  currentResidence,
  company,
  hometown
}) => {
  const isShowDetail = currentResidence || company || hometown

  const renderDetail = () => {
    return (
      <div className='mb-4'>
        {currentResidence ? (
          <div className='flex items-center mb-4'>
            <MdHouse className='mr-2 text-slate-400' size='24px' />
            <div>現居 {currentResidence}</div>
          </div>
        ) : null}
        {company ? (
          <div className='flex items-center mb-4'>
            <MdWorkOutline className='mr-2 text-slate-400' size='24px' />
            <div>於 {company} 工作</div>
          </div>
        ) : null}
        {hometown ? (
          <div className='flex items-center'>
            <MdLocationOn className='mr-2 text-slate-400' size='24px' />
            <div>來自 {hometown}</div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <>
      {isShowDetail ? renderDetail() : null}
      {isSelf ? (
        <Button size={ButtonSize.SMALL} variant={ButtonVariant.AUXILIARY}>
          {isShowDetail ? '編輯' : '新增'}詳細資料
        </Button>
      ) : null}
    </>
  )
}

export default DetailBlock
