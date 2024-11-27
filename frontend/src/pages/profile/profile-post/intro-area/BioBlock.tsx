import { FC, useState } from 'react'
import Button from '@/components/form/Button'
import TextareaEditBlock from '@/components/form/TextareaEditBlock'
import { ButtonSize, ButtonVariant } from '@/types/component/button'

type BioBlockProps = {
  className: string
  isSelf: boolean
  bio: string
}

const BioBlock: FC<BioBlockProps> = ({ isSelf, bio, className }) => {
  const [isEditing, setEditing] = useState(false)
  const save = () => {}

  if (isSelf) {
    return (
      <div className={className}>
        {isEditing ? (
          <TextareaEditBlock
            placeholder='介紹你自己'
            initialValue={bio}
            handleCancel={() => setEditing(false)}
            handleSave={save}
          />
        ) : (
          <div className='text-center mb-2'>{bio}</div>
        )}
        {isEditing ? null : (
          <Button
            size={ButtonSize.SMALL}
            variant={ButtonVariant.AUXILIARY}
            onClick={() => setEditing(true)}
          >
            {bio ? '編輯個人簡介' : '新增個人簡介'}
          </Button>
        )}
      </div>
    )
  }

  return bio ? (
    <div className='text-center pb-2 border-b border-b-slate-300'>{bio}</div>
  ) : null
}

export default BioBlock
