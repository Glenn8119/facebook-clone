import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'
import useUserContext from '@/hooks/useUserContext'

import Card from '@/components/layout/Card'
import BioBlock from '@/pages/profile/profile-post/intro-area/BioBlock.tsx'
import DetailBlock from '@/pages/profile/profile-post/intro-area/DetailBlock'
import useUpdateUserDetail from '@/hooks/api/mutation/useUpdateUserDetail'

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
  const { mutateAsync: updateUserDetail } = useUpdateUserDetail()
  const isSelf = selfId === userId

  if (!userDetail) {
    return null
  }

  const { bio, hometown, currentResidence, company, avatarImage, coverImage } =
    userDetail

  const originalUserDetail = {
    bio,
    hometown,
    current_residence: currentResidence,
    company,
    avatar_image: avatarImage,
    cover_image: coverImage
  }

  const onUpdateBio = async (newBio: string) => {
    await updateUserDetail({
      ...originalUserDetail,
      bio: newBio
    })
  }

  const onUpdateDetail = (key: string, value: string) => {
    updateUserDetail({
      ...originalUserDetail,
      [key]: value
    })
  }

  return (
    <Card className={className}>
      <div className='text-xl font-bold mb-2'>簡介</div>
      <BioBlock
        className='mb-4'
        isSelf={isSelf}
        bio={bio ?? ''}
        userId={userId}
        onUpdateBio={onUpdateBio}
      />
      <DetailBlock
        isSelf={isSelf}
        hometown={hometown ?? ''}
        currentResidence={currentResidence ?? ''}
        company={company ?? ''}
        onUpdateDetail={onUpdateDetail}
      />
    </Card>
  )
}

export default IntroArea
