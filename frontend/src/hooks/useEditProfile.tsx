import { EditBlockType } from '@/components/form/EditBlock'
import { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

type ProfileFormKey =
  | 'avatarImage'
  | 'coverImage'
  | 'bio'
  | 'currentResidence'
  | 'hometown'
  | 'company'

type ProfileFormData = {
  key: ProfileFormKey
  value: string
  formType: EditBlockType
}[]

const useEditProfile = <T extends ProfileFormData>(initialValue: T) => {
  const [formData, setFormData] = useState<T>(initialValue)

  const updateFormData = (key: ProfileFormKey, value: string) => {
    const clonedForm = cloneDeep(formData)
    const newFormData = clonedForm.map((field) => {
      if (field.key === key) {
        return {
          ...field,
          value
        }
      }

      return field
    }) as typeof formData

    setFormData(newFormData)
  }

  return { updateFormData, formData }
}

export default useEditProfile
