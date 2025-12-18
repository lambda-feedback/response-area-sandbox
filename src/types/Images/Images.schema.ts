import { z } from 'zod'

export const CONSTRAINTS = {
  maxImages: { min: 1, max: 10, default: 3 },
  maxSizeMb: { min: 1, max: 20, default: 10 },
  allowedTypes: { default: ['image/jpg', 'image/jpeg', 'image/png'] },
  resizeMaxSide: { min: 0, max: 4096, default: 0 }, // 0 means no resize
}

// --- SCHEMAS ---
export const configSchema = z.object({
  maxImages: z.number().min(CONSTRAINTS.maxImages.min).max(CONSTRAINTS.maxImages.max).default(CONSTRAINTS.maxImages.default),
  allowedTypes: z.array(z.string()).default(CONSTRAINTS.allowedTypes.default),
  maxSizeMb: z.number().min(CONSTRAINTS.maxSizeMb.min).max(CONSTRAINTS.maxSizeMb.max).default(CONSTRAINTS.maxSizeMb.default),
  resizeMaxSide: z.number().min(CONSTRAINTS.resizeMaxSide.min).max(CONSTRAINTS.resizeMaxSide.max).default(CONSTRAINTS.resizeMaxSide.default),
})

export const answerSchema = z.array(
  z.object({
    data: z.string(), // base64
    name: z.string(),
    type: z.string(),
    size: z.number(),
    comment: z.string().optional(),
  })
).max(CONSTRAINTS.maxImages.max)

// --- TYPE EXPORTS ---
export type ImagesConfig = z.infer<typeof configSchema>
export type ImagesAnswer = z.infer<typeof answerSchema>