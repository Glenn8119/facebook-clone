import { EditBlockType } from '@/components/form/EditBlock'
import { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

type ProfileFormData = {
  key: string
  value: string
  formType: EditBlockType
  label: string
  hint: string
  placeholder?: string
}[]

const useEditProfile = <T extends ProfileFormData>(initialValue: T) => {
  const [formData, setFormData] = useState<T>(initialValue)

  const updateFormData = (key: string, value: string) => {
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
