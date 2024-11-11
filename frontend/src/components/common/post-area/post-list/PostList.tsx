import FullScreenLoading from '@/components/FullScreenLoading'
import Spin from '@/components/Spin'
import Post from '@/components/common/post-area/post-list/post/Post'
import usePostListInfiniteQuery from '@/hooks/api/queries/usePostListInfiniteQuery'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useState } from 'react'

type PostListProps = {
  userId?: string
}

const wait = (seconds: number) =>
  new Promise((res) => setTimeout(res, seconds * 1000))

const PostList = ({ userId }: PostListProps) => {
  const {
    postList,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = usePostListInfiniteQuery(userId)

  const [delaying, setDelaying] = useState(false)

  const delayFetch = async () => {
    if (hasNextPage) {
      setDelaying(true)
      await wait(0.5)
      await fetchNextPage()
      setDelaying(false)
    }
  }

  useInfiniteScroll(
    () => !isFetchingNextPage && !delaying && delayFetch(),
    true
  )

  if (!postList || isPending) {
    return <FullScreenLoading />
  }

  return (
    <div>
      {postList.map((post) => (
        <Post className='mb-3' key={post.id} post={post} />
      ))}
      {isFetchingNextPage || delaying ? (
        <Spin className='w-8 h-8 mt-2' />
      ) : null}
    </div>
  )
}

export default PostList
