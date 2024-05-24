import { z } from 'zod'

const friendSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

export const friendRecommendationSchema = z.array(friendSchema)

export type FriendResponseType = z.infer<typeof friendRecommendationSchema>
