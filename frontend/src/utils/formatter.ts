import { PlainObject } from '@/types/common'
import capitalize from 'lodash/capitalize'
import isPlainObject from 'lodash/isPlainObject'

const isTypePlainObject = (value: unknown): value is PlainObject => {
  return isPlainObject(value)
}

type SnakeToCamel<Str> = Str extends `${infer First}_${infer Rest}`
  ? `${First}${SnakeToCamel<Capitalize<Rest>>}`
  : Str

export type TransformObjectKeyFromSnakeToCamel<T> = {
  [K in keyof T as SnakeToCamel<K>]: TransformObjectKeyFromSnakeToCamel<T[K]>
}

export const transformObjectKeyFromSnakeToCamel = <T>(
  object: T
): TransformObjectKeyFromSnakeToCamel<T> => {
  if (!isTypePlainObject(object) && !Array.isArray(object)) {
    return object as TransformObjectKeyFromSnakeToCamel<T>
  }

  if (Array.isArray(object)) {
    const output = object.map((item) =>
      transformObjectKeyFromSnakeToCamel(item)
    )

    return output as TransformObjectKeyFromSnakeToCamel<T>
  }

  const output = {} as any

  const keyList = Object.keys(object)
  for (const key of keyList) {
    const value = object[key]
    const camelKey = snakeToCamel(key)
    output[camelKey] = transformObjectKeyFromSnakeToCamel(value)
  }

  return output as TransformObjectKeyFromSnakeToCamel<T>
}

const snakeToCamel = (str: string): string => {
  let output = ''
  const array = str.split('_')
  for (let i = 0; i < array.length; i++) {
    let str = array[i]
    i !== 0 && (str = capitalize(str))
    output += str
  }

  return output
}
