import z from 'zod'
export const PROJECT_STATUSES = ['draft', 'active', 'finished'] as const
export const projectSchema = z.object({
  name: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  description: z
    .string()
    .optional()
    .transform(v => v || undefined),
  notification: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean()
  })
})
