import { FC } from 'react'
import BasicInfo from '@/pages/profile/basic-info/BasicInfo'
import { useSearchParams } from 'react-router-dom'
import ProfileFriends from '@/pages/profile/profile-friends/ProfileFriends'
import ProfilePost from '@/pages/profile/profile-post/ProfilePost'
import { PROFILE_QUERIES } from '@/constants/pages/profile'
import useFetchUserFriendList from '@/hooks/api/useFetchFriendList'
import useGetUserDetail from '@/hooks/api/useGetUserDetail'

const ProfilePage: FC = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const userId = searchParams.get('id') as string

  const renderComponent = () => {
    if (
      tab === PROFILE_QUERIES.FRIENDS ||
      tab === PROFILE_QUERIES.FRIENDS_MUTUAL
    ) {
      return <ProfileFriends />
    }

    return <ProfilePost />
  }

  const { friendList } = useFetchUserFriendList(userId)
  const { userDetail } = useGetUserDetail(userId)

  if (!friendList || !userDetail) {
    return null
  }

  return (
    <div className='w-full'>
      <BasicInfo />
      <div className='w-10/12 m-auto py-4'>{renderComponent()}</div>
    </div>
  )
}

export default ProfilePage
