import { z } from "zod"

export const mbcSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional()
})

export type mbcSchemaType = z.infer<typeof mbcSchema>