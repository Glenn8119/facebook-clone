import useGetUserDetail from '@/hooks/api/queries/useGetUserDetail'
import { useSearchParams } from 'react-router-dom'

const Cover = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('id') as string

  const { userDetail } = useGetUserDetail(userId)

  return (
    <div className='block w-full bg-main aspect-cover rounded-lg'>
      {userDetail!.coverImage ? (
        <img
          src={userDetail?.coverImage}
          className='w-full object-cover rounded-lg'
        />
      ) : null}
    </div>
  )
}

export default Cover
