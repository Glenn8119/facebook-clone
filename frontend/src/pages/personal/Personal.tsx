import { FC } from 'react'
import BasicInfo from '@/pages/personal/basic-info/BasicInfo'
import { useSearchParams } from 'react-router-dom'
import PersonalFriends from './personal-friends/PersonalFriends'
import PersonalPost from './personal-post/PersonalPost'
import { PERSONAL_TABS } from '@/constants/pages/personal'

const PersonalPage: FC = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')

  const renderComponent = () => {
    if (tab === PERSONAL_TABS.FRIENDS) {
      return <PersonalFriends />
    }

    return <PersonalPost />
  }

  return (
    <div className='w-full'>
      <BasicInfo />
      <div className='w-10/12 m-auto py-4'>{renderComponent()}</div>
    </div>
  )
}

export default PersonalPage
