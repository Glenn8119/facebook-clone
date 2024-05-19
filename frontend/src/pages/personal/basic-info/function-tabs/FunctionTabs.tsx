import { useNavigate } from 'react-router-dom'
import Tab from '@/pages/personal/basic-info/function-tabs/Tab'

const tabItems = [
  { label: '貼文', route: '/personal' },
  { label: '朋友', route: '/friends' }
]
const FunctionTabs = () => {
  const navigate = useNavigate()

  const tabs = tabItems.map((tab) => {
    return (
      <Tab
        isActive
        key={tab.label}
        label={tab.label}
        onClick={() => navigate(tab.route)}
      />
    )
  })

  return <div className='flex py-1'>{tabs}</div>
}

export default FunctionTabs
