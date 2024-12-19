import z from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().transform(v => v || undefined)
})
