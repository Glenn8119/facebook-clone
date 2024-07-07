import Card from '@/components/layout/Card'
import { FC, useRef } from 'react'
import PostUserInfo from '@/components/common/post-area/post-list/post/PostUserInfo'
import Comment from '@/components/common/post-area/post-list/post/Comment'
import CommentAction from '@/components/common/post-area/post-list/post/CommentAction'
import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdOutlineModeComment
} from 'react-icons/md'
import scrollCenterElement from '@/utils/scrollCenterElement'
import { getDayFromNow } from '@/utils/formatter/dayjs'
import { type Post } from '@/types/api/post'

type PostProps = {
  className: string
  post: Post
}

const Post: FC<PostProps> = ({ className, post }) => {
  const commentInputRef = useRef<HTMLInputElement>(null)

  const commentClick = () => {
    if (commentInputRef.current) {
      const input = commentInputRef.current
      input.focus()
      scrollCenterElement(input)
    }
  }

  const postTime = getDayFromNow(new Date(post.createdAt))
  const renderLikerOverview = () => {
    if (!post.likerList.length) return null

    let text = ''
    const friendList = post.likerList.filter(
      (liker) => liker.isFriend || liker.isFriend === null
    )
    if (!friendList.length) {
      text = post.likerList.length.toString()
    }

    const order = [null, true, false]
    friendList.sort(
      (a, b) => order.indexOf(b.isFriend) - order.indexOf(a.isFriend)
    )

    text = `${friendList[0].name}和其他${post.likerList.length - 1}人`

    return (
      <>
        <div className='w-5 h-5 mr-1 cursor-pointer flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full'>
          <MdThumbUp color='white' size={12} />
        </div>
        <span className='mr-auto text-15 text-gray-400 hover:underline cursor-pointer'>
          {text}
        </span>
      </>
    )
  }

  const renderCommentList = post.commentList.map((comment) => (
    <Comment
      key={comment.id}
      content={comment.content}
      name={comment.poster}
      className='mb-2'
    />
  ))

  return (
    <Card className={className}>
      <PostUserInfo name={post.poster} createAt={postTime} />
      <div className='py-4'>{post.content}</div>
      <div className='flex items-center mb-3'>
        <div className='mr-auto flex items-center'>{renderLikerOverview()}</div>
        <span className='cursor-pointer hover:underline text-gray-400'>
          {post.commentList.length ? `${post.commentList.length}則留言` : null}
        </span>
      </div>
      <div className='flex py-1 mb-2 border-t border-b text-gray-500 text-15'>
        <div className='flex items-center justify-center flex-grow py-1 cursor-pointer hover:bg-main'>
          <MdOutlineThumbUp size='20' className='mr-2' />
          <span>讚</span>
        </div>
        <div
          className='flex items-center justify-center flex-grow py-1 cursor-pointer hover:bg-main'
          onClick={commentClick}
        >
          <MdOutlineModeComment size='20' className='mr-2' />
          <span>留言</span>
        </div>
      </div>
      {renderCommentList}
      <CommentAction ref={commentInputRef} />
    </Card>
  )
}

export default Post
