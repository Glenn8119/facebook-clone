import { useLocation, useNavigate } from 'react-router-dom'
import Tab from '@/pages/personal/basic-info/function-tabs/Tab'

const tabItems = [
  { label: '貼文', route: '/personal' },
  { label: '朋友', route: '/personal/friends' }
]
const FunctionTabs = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = tabItems.map((tab) => {
    const isActive = location.pathname === tab.route
    return (
      <Tab
        isActive={isActive}
        key={tab.label}
        label={tab.label}
        onClick={() => navigate(tab.route)}
      />
    )
  })

  return <div className='flex py-1'>{tabs}</div>
}

export default FunctionTabs
