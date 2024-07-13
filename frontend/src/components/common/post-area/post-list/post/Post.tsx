import { FC, MouseEvent, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdOutlineModeComment,
  MdMoreHoriz
} from 'react-icons/md'

import Card from '@/components/layout/Card'
import PostUserInfo from '@/components/common/post-area/post-list/post/PostUserInfo'
import Comment from '@/components/common/post-area/post-list/post/comment/Comment'
import CommentAction, {
  CommentActionForwardedRefType
} from '@/components/common/post-area/post-list/post/comment/CommentAction'
import PostActionModal from '@/components/common/post-area/PostActionModal'

import { getTimeFromNow } from '@/utils/formatter/dayjs'

import { type Post } from '@/types/api/post'
import { FriendStatus } from '@/types/common'

import useCreatePostComment from '@/hooks/api/mutation/useAddPostComment'
import useLikePost from '@/hooks/api/mutation/useLikePost'
import useUnlikePost from '@/hooks/api/mutation/useUnlikePost'
import useUserContext from '@/hooks/useUserContext'
import useDeletePostComment from '@/hooks/api/mutation/useDeletePostComment'
import useEditPostComment from '@/hooks/api/mutation/useEditPostComment'
import Popover from '@/components/Popover'
import MoreAction from './comment/MoreAction'
import { PostFormType, postFormSchema } from '@/schema/validation/add-post'
import useForm from '@/hooks/useForm'
import useEditPost from '@/hooks/api/mutation/useEditPost'
import ConfirmModal from '@/components/common/ConfirmModal'
import useDeletePost from '@/hooks/api/mutation/useDeletePost'

const CommentList = ({
  post,
  selfId,
  deletePostComment,
  editPostComment
}: {
  post: Post
  selfId: string
  deletePostComment: (body: {
    postId: string
    commentId: string
  }) => Promise<void>
  editPostComment: (body: {
    postId: string
    commentId: string
    content: string
  }) => Promise<void>
}) => {
  const renderCommentList = post.commentList.map((comment) => {
    const createTime = getTimeFromNow(new Date(comment.createdAt))
    return (
      <Comment
        className='mb-2'
        isHoverShowDots={comment.posterId === selfId}
        key={comment.id}
        content={comment.content}
        createAt={createTime}
        hasEdited={comment.createdAt !== comment.updatedAt}
        name={comment.poster}
        onDeletePostComment={() =>
          deletePostComment({ postId: post.id, commentId: comment.id })
        }
        onEditPostComment={(content) =>
          editPostComment({ postId: post.id, commentId: comment.id, content })
        }
      />
    )
  })

  return renderCommentList
}

const LikerOverveiw = ({ post }: { post: Post }) => {
  if (!post.likerList.length) return null

  let text = ''
  const friendList = post.likerList.filter(
    (liker) =>
      liker.friendStatus === FriendStatus.IsFriend ||
      liker.friendStatus === FriendStatus.IsSelf
  )
  if (!friendList.length) {
    text = post.likerList.length.toString()
  } else {
    const order = [
      FriendStatus.IsSelf,
      FriendStatus.IsFriend,
      FriendStatus.IsNotFriend
    ]
    friendList.sort(
      (a, b) => order.indexOf(a.friendStatus) - order.indexOf(b.friendStatus)
    )

    text = friendList[0].name

    const restPeople = post.likerList.length - 1
    if (restPeople) {
      text += `和其他${post.likerList.length - 1}人`
    }
  }

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

type PostProps = {
  className: string
  post: Post
}

const Post: FC<PostProps> = ({ className, post }) => {
  const commentInputRef = useRef<CommentActionForwardedRefType>(null)
  const [commentInput, setCommentInput] = useState('')
  const [isPostModalShow, setPostModalShow] = useState(false)
  const [isConfirmDeletePostModalShow, setConfirmDeletePostModalShow] =
    useState(false)

  const {
    value: { id: selfId }
  } = useUserContext()
  const handleSendComment = () => {
    if (!commentInput) return

    setCommentInput('')
    createPostComment({ postId: post.id, content: commentInput })
  }

  const { createPostComment } = useCreatePostComment()
  const { likePost } = useLikePost()
  const { unlikePost } = useUnlikePost()
  const { deletePostComment } = useDeletePostComment()
  const { editPostComment } = useEditPostComment()
  const { editPost } = useEditPost()
  const { deletePost } = useDeletePost()

  const isSelfPost = selfId === post.userId

  const closePostActionModal = () => {
    setPostModalShow(false)
  }

  const onSubmit = async (formData: PostFormType) => {
    await editPost({ ...formData, postId: post.id })
    closePostActionModal()
  }

  const { formData, setFormData, submit, error } = useForm(
    { content: '' },
    postFormSchema,
    onSubmit
  )

  const onTextAreaChange = (value: string) => {
    setFormData({
      content: value
    })
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    submit()
  }

  const commentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.scrollAndFocusInput()
    }
  }

  const postTime = getTimeFromNow(new Date(post.createdAt))
  const isLikeBySelf = !!post.likerList.find((liker) => liker.id === selfId)

  const handleLike = () => {
    if (!isLikeBySelf) {
      likePost(post.id)
    } else {
      unlikePost(post.id)
    }
  }

  const handleEditAction = () => {
    setPostModalShow(true)
  }

  const handleDeleteAction = () => {
    setConfirmDeletePostModalShow(true)
  }
  const likeClassName = twMerge(
    'flex items-center justify-center flex-grow py-1 cursor-pointer hover:bg-main',
    isLikeBySelf ? 'text-blue-500' : ''
  )

  const postClassname = twMerge('relative', className)

  return (
    <Card className={postClassname}>
      {isSelfPost ? (
        <Popover
          containerClass='absolute top-4 right-4 cursor-pointer'
          closeWhenClicked
          popOverElement={
            <MoreAction
              handleDelete={handleDeleteAction}
              handleEdit={handleEditAction}
            />
          }
        >
          <MdMoreHoriz size={24} />
        </Popover>
      ) : null}
      <PostUserInfo name={post.poster} createAt={postTime} />
      <div className='py-4'>{post.content}</div>
      <div className='flex items-center mb-3'>
        <div className='mr-auto flex items-center'>
          <LikerOverveiw post={post} />
        </div>
        <span className='text-gray-400'>
          {post.commentList.length ? `${post.commentList.length}則留言` : null}
        </span>
      </div>
      <div className='flex py-1 mb-2 border-t border-b text-gray-500 text-15'>
        <div className={likeClassName} onClick={handleLike}>
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
      <CommentList
        selfId={selfId}
        post={post}
        deletePostComment={deletePostComment}
        editPostComment={editPostComment}
      />
      <CommentAction
        ref={commentInputRef}
        inputValue={commentInput}
        setInputValue={setCommentInput}
        handleEnterKey={handleSendComment}
      />
      {isPostModalShow ? (
        <PostActionModal
          buttonLabel='儲存'
          title='編輯貼文'
          isError={!!error?.content}
          textAreaValue={formData.content}
          errorMessageList={error?.content?._errors}
          closeModal={closePostActionModal}
          onSubmit={handleSubmit}
          onTextAreaChange={onTextAreaChange}
        />
      ) : null}
      {isConfirmDeletePostModalShow ? (
        <ConfirmModal
          title='刪除貼文？'
          description='確定要刪除這則貼文嗎？'
          confirmLabel='刪除'
          closeModal={() => setConfirmDeletePostModalShow(false)}
          onCancel={() => setConfirmDeletePostModalShow(false)}
          onConfirm={() => deletePost(post.id)}
        />
      ) : null}
    </Card>
  )
}

export default Post
