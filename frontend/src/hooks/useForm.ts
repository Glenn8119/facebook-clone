import { useState } from 'react'
import { z } from 'zod'

const useForm = <FormData>(
  initFormData: FormData,
  schema: z.Schema<FormData>,
  onSubmit: (data: FormData) => void
) => {
  const [formData, setFormData] = useState<FormData>(initFormData)
  const [error, setError] = useState<z.ZodFormattedError<FormData>>()

  const submit = () => {
    const parsedFormData = schema.safeParse(formData)
    if (!parsedFormData.success) {
      setError(parsedFormData.error.format())
    } else {
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
