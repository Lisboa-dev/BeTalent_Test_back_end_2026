import vine  from '@vinejs/vine'

export const clientCreateValidator = vine.create({
  name: vine.string().trim(),
  email: vine.string().email().trim(),
})

export const clientUpdateValidator = vine.create({
  name: vine.string().trim().optional(),
  email: vine.string().email().trim().optional(),
})