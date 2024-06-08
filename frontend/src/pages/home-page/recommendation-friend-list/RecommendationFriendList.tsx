import FriendApi from '@/api/friend'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import RecommendationFriendItem from '@/pages/home-page/recommendation-friend-list/RecommendationFriendItem'

type RecommendationFriendListProps = {
  className: string
}

const RecommendationFriendList: FC<RecommendationFriendListProps> = ({
  className
}) => {
  const cn = twMerge(className)

  const { data: recommendationFriendList } = useQuery({
    queryKey: ['friendRecommendation'],
    queryFn: FriendApi.getRecommendationFriendList
  })

  if (!recommendationFriendList) {
    return null
  }

  return (
    <div className={cn}>
      <div className='mb-4 text-lg text-slate-500'>推薦的朋友</div>
      {recommendationFriendList.map((friend) => (
        <RecommendationFriendItem
          className='mb-3'
          recommendationFriend={friend}
          key={friend.id}
        />
      ))}
    </div>
  )
}

export default RecommendationFriendList
