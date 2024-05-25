import { Friend } from '@/types/pages/home-page'
import { FC } from 'react'

interface FriendItemProps {
  recommendationFriend: Friend
}

const RecommendationFriendItem: FC<FriendItemProps> = ({
  recommendationFriend
}) => {
  return <div>{recommendationFriend.name}</div>
}

export default RecommendationFriendItem
