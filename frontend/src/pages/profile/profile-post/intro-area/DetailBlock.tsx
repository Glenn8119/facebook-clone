import { FC } from 'react'
import { MdLocationOn, MdWorkOutline, MdHouse } from 'react-icons/md'

type DetailBlockProps = {
  currentResidence: string
  company: string
  hometown: string
}

const DetailBlock: FC<DetailBlockProps> = ({
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

  return <>{isShowDetail ? renderDetail() : <div>尚無詳細資料</div>}</>
}

export default DetailBlock
