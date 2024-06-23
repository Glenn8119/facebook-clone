import { useSearchParams } from 'react-router-dom'
import Tab from '@/pages/personal/basic-info/function-tabs/Tab'
import { PERSONAL_TABS } from '@/constants/pages/personal'

const tabItems = [
  { label: '貼文', type: '' },
  { label: '朋友', type: PERSONAL_TABS.FRIENDS }
]
const FunctionTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id') ?? ''
  const tab = searchParams.get('tab') ?? ''

  const tabs = tabItems.map((_tab) => {
    const isActive = tab === _tab.type
    const params = { id } as Record<string, string>
    _tab.type && (params.tab = _tab.type)

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
