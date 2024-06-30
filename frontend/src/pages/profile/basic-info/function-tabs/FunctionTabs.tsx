import { useSearchParams } from 'react-router-dom'
import Tab from '@/pages/profile/basic-info/function-tabs/Tab'
import { PROFILE_QUERIES } from '@/constants/pages/profile'

const tabItems = [
  { label: '貼文', type: [''] },
  {
    label: '朋友',
    type: [PROFILE_QUERIES.FRIENDS, PROFILE_QUERIES.FRIENDS_MUTUAL]
  }
]
const FunctionTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id') ?? ''
  const tab = searchParams.get('tab') ?? ''

  const tabs = tabItems.map((_tab) => {
    const isActive = _tab.type.includes(tab)
    const params = { id } as Record<string, string>
    _tab.type[0] && (params.tab = _tab.type[0])

    return (
      <Tab
        isActive={isActive}
        key={_tab.label}
        label={_tab.label}
        onClick={() => setSearchParams(params)}
      />
    )
  })

  return <div className='flex py-1'>{tabs}</div>
}

export default FunctionTabs
