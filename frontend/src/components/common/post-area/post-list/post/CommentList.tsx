import { Post } from '@/types/api/post'
import { getTimeFromNow } from '@/utils/formatter/dayjs'
import Comment from '@/components/common/post-area/post-list/post/comment/Comment'

type CommentListProps = {
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
}

const CommentList = ({
  post,
  selfId,
  deletePostComment,
  editPostComment
}: CommentListProps) => {
  // TODO: 留言分頁管理
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

export default CommentList
