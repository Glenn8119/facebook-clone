import { Post } from '@/types/api/post'
import { getTimeFromNow } from '@/utils/formatter/dayjs'
import Comment from '@/components/common/post-area/post-list/post/comment/Comment'

type CommentListProps = {
  postId: string
  selfId: string
  commentList: Post['commentList']
  deletePostComment: (body: {
    postId: string
    commentId: string
  }) => Promise<void>
  editPostComment: (body: {
    postId: string
    commentId: string
    content: string
  }) => Promise<void>
}

const CommentList = ({
  postId,
  selfId,
  commentList,
  deletePostComment,
  editPostComment
}: CommentListProps) => {
  // TODO: 留言分頁管理
  const renderCommentList = commentList.map((comment) => {
    const createTime = getTimeFromNow(new Date(comment.createdAt))
    return (
      <Comment
        key={comment.id}
        userId={comment.posterId}
        className='mb-2'
        isHoverShowDots={comment.posterId === selfId}
        content={comment.content}
        createAt={createTime}
        hasEdited={comment.createdAt !== comment.updatedAt}
        name={comment.poster}
        onDeletePostComment={() =>
          deletePostComment({ postId, commentId: comment.id })
        }
        onEditPostComment={(content) =>
          editPostComment({ postId, commentId: comment.id, content })
        }
      />
    )
  })

  return renderCommentList
}

export default CommentList
