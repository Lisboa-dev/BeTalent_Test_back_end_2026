import vine  from '@vinejs/vine'

export const gatewayCreateValidator = vine.create({
  name: vine.string().trim(),
  is_active: vine
    .string()
    .transform((value) => value === 'true'),
  priority: vine.number(),
})

export const gatewayUpdateValidator = vine.create({
  name: vine.string().trim().optional(),
  isActive: vine
    .string()
    .transform((value) => value === 'true')
    .optional(),
  priority: vine.number().optional(),
})



