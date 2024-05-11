import { Nullable } from '@/types/common'
import { useState } from 'react'
import { z } from 'zod'

const useForm = <FormData>(
  initFormData: FormData,
  schema: z.Schema<FormData>,
  onSubmit: (data: FormData) => void | Promise<void>
) => {
  const [formData, setFormData] = useState<FormData>(initFormData)
  const [error, setError] =
    useState<Nullable<z.ZodFormattedError<FormData>>>(null)

  const submit = async () => {
    const parsedFormData = schema.safeParse(formData)
    if (!parsedFormData.success) {
      setError(parsedFormData.error.format())
    } else {
      setError(null)
      await onSubmit(parsedFormData.data)
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
