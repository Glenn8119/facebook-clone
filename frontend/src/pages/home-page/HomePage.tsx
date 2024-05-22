import FunctionList from '@/pages/home-page/FunctionList'
import PostArea from '@/components/common/post-area/PostArea'

const HomePage = () => {
  return (
    <div className='flex gap-4'>
      <FunctionList className='basis-1/4 sticky top-14' />
      <PostArea className='basis-1/2' />
      <div className='basis-1/4 h-[calc(100dvh-56px)] p-4 sticky top-14'>
        right
      </div>
    </div>
  )
}

export default HomePage
