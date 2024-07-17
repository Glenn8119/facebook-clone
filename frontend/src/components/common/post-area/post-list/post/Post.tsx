import { FC, MouseEvent, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  MdOutlineThumbUp,
  MdOutlineModeComment,
  MdMoreHoriz
} from 'react-icons/md'

import Card from '@/components/layout/Card'
import PostUserInfo from '@/components/common/post-area/post-list/post/PostUserInfo'
import CommentAction, {
  type CommentActionForwardedRefType
} from '@/components/common/post-area/post-list/post/comment/CommentAction'
import PostActionModal from '@/components/common/post-area/PostActionModal'
import CommentList from '@/components/common/post-area/post-list/post/CommentList'
import LikerOverview from '@/components/common/post-area/post-list/post/LikerOverview'
import ConfirmModal from '@/components/common/ConfirmModal'
import Popover from '@/components/Popover'
import MoreAction from '@/components/common/post-area/post-list/post/comment/MoreAction'

import { getTimeFromNow } from '@/utils/formatter/dayjs'

import { type Post } from '@/types/api/post'

import useCreatePostComment from '@/hooks/api/mutation/useAddPostComment'
import useLikePost from '@/hooks/api/mutation/useLikePost'
import useUnlikePost from '@/hooks/api/mutation/useUnlikePost'
import useUserContext from '@/hooks/useUserContext'
import useDeletePostComment from '@/hooks/api/mutation/useDeletePostComment'
import useEditPostComment from '@/hooks/api/mutation/useEditPostComment'
import useForm from '@/hooks/useForm'
import useEditPost from '@/hooks/api/mutation/useEditPost'
import useDeletePost from '@/hooks/api/mutation/useDeletePost'

import { type PostFormType, postFormSchema } from '@/schema/validation/add-post'
import LikerListModal from './LikerListModal'

type PostProps = {
  className: string
  post: Post
}

const Post: FC<PostProps> = ({ className, post }) => {
  const commentInputRef = useRef<CommentActionForwardedRefType>(null)
  const [commentInput, setCommentInput] = useState('')
  const [isPostModalShow, setPostModalShow] = useState(false)
  const [isLikerListModalShow, setLikerListModal] = useState(false)
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
    { content: post.content },
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
    <>
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
        <PostUserInfo post={post} createAt={postTime} />
        <div className='py-4'>{post.content}</div>
        <div className='flex items-center mb-3'>
          <div
            className='mr-auto flex items-center'
            onClick={() => setLikerListModal(true)}
          >
            <LikerOverview post={post} />
          </div>
          <span className='text-gray-400'>
            {post.commentList.length
              ? `${post.commentList.length}則留言`
              : null}
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
      {isLikerListModalShow ? (
        <LikerListModal
          likerList={post.likerList}
          closeModal={() => setLikerListModal(false)}
        />
      ) : null}
    </>
  )
}

export default Post
