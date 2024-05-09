import { Nullable } from '@/types/common'
import { useState } from 'react'
import { z } from 'zod'

const useForm = <FormData>(
  initFormData: FormData,
  schema: z.Schema<FormData>,
  onSubmit: (data: FormData) => void
) => {
  const [formData, setFormData] = useState<FormData>(initFormData)
  const [error, setError] =
    useState<Nullable<z.ZodFormattedError<FormData>>>(null)

  const submit = () => {
    const parsedFormData = schema.safeParse(formData)
    if (!parsedFormData.success) {
      setError(parsedFormData.error.format())
    } else {
      setError(null)
      onSubmit(parsedFormData.data)
    }
  }

  return {
    formData,
    setFormData,
    submit,
    error
  }
}

export default useForm
