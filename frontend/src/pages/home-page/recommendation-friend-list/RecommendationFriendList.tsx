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
    queryFn: FriendApi.getRecommendationFriend
  })

  console.log({ recommendationFriendList })

  if (!recommendationFriendList) {
    return null
  }

  return (
    <div className={cn}>
      {recommendationFriendList.map((friend) => (
        <RecommendationFriendItem
          recommendationFriend={friend}
          key={friend.id}
        />
      ))}
    </div>
  )
}

export default RecommendationFriendList
