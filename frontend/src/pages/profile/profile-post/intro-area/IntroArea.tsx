import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'

import Card from '@/components/layout/Card'
import DetailBlock from '@/pages/profile/profile-post/intro-area/DetailBlock'

type IntroAreaType = {
  className: string
}

const IntroArea: FC<IntroAreaType> = ({ className }) => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const { userDetail } = useGetUserDetail(userId)

  if (!userDetail) {
    return null
  }

  const { bio, hometown, currentResidence, company } = userDetail

  return (
    <Card className={className}>
      <div className='text-xl font-bold mb-2'>簡介</div>
      <div className='text-center pb-2 whitespace-pre-wrap'>{bio}</div>
      <div className='text-xl font-bold mb-4'>詳細資料</div>
      <DetailBlock
        hometown={hometown ?? ''}
        currentResidence={currentResidence ?? ''}
        company={company ?? ''}
      />
    </Card>
  )
}

export default IntroArea
