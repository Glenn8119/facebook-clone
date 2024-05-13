import FunctionList from './FunctionList'
import PostArea from './post-area/PostArea'

const HomePage = () => {
  return (
    <div className='flex'>
      <FunctionList className='basis-1/4' />
      <PostArea className='basis-1/2' />
      <div className='basis-1/4'>right</div>
    </div>
  )
}

export default HomePage
