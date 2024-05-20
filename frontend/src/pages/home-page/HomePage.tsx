import FunctionList from '@/pages/home-page/FunctionList'
import PostArea from '@/components/common/post-area/PostArea'

const HomePage = () => {
  return (
    <div className='flex gap-4'>
      <FunctionList className='basis-1/4' />
      <PostArea className='basis-1/2' />
      <div className='basis-1/4'>right</div>
    </div>
  )
}

export default HomePage
