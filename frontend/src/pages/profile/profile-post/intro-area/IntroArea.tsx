import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'
import useUserContext from '@/hooks/useUserContext'

import Card from '@/components/layout/Card'
import BioBlock from '@/pages/profile/profile-post/intro-area/BioBlock.tsx'
import DetailBlock from '@/pages/profile/profile-post/intro-area/DetailBlock'

type IntroAreaType = {
  className: string
}

const IntroArea: FC<IntroAreaType> = ({ className }) => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string
  const {
    value: { id: selfId }
  } = useUserContext()
  const { userDetail } = useGetUserDetail(userId)
  const isSelf = selfId === userId

  if (!userDetail) {
    return null
  }

  const { bio, hometown, currentResidence, company } = userDetail
  console.log({ hometown })

  return (
    <Card className={className}>
      <div className='text-xl font-bold mb-2'>簡介</div>
      <BioBlock isSelf={isSelf} bio={bio ?? ''} className='mb-4' />
      <DetailBlock
        isSelf={isSelf}
        hometown={hometown ?? ''}
        currentResidence={currentResidence ?? ''}
        company={company ?? ''}
      />
    </Card>
  )
}

export default IntroArea
