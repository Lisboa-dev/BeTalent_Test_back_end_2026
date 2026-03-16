import vine  from '@vinejs/vine'


const transactionStatus = [
  'pending',
  'approved',
  'rejected',
  'refunded',
  'cancelled',
  'failed',
  'compensated'
] as const



export const transactionValidator = vine.create(
  vine.object({
    payment: vine.object({
      name: vine.string().trim(),
      email: vine.string().email(),
      cardNumber: vine.string().regex(/^[0-9]{13,19}$/),
      cvv: vine.string().regex(/^[0-9]{3,4}$/),
      amount: vine.number().optional()
    }),

    products: vine.array(
      vine.object({
        id: vine.number(),
        quantity: vine.number().min(1)
      })
    ).minLength(1),
    clientId: vine.number().optional(),
    idempotency_key: vine.string().trim().minLength(10).maxLength(20)
   }),
)

export const transactionUpdateValidator = vine.create({
  gatewayId: vine.number().optional(),
  externalId: vine.string().optional(),

  status: vine.enum(transactionStatus).optional(),

  amount: vine.number().positive().optional(),

  cardLastNumbers: vine
    .string()
    .regex(/^[0-9]{4}$/)
    .optional(),

  value: vine.number().positive().optional(),
})

export const transactionProductCreateValidator = vine.create({
  productId: vine.number(),
  transactionId: vine.number(),
  quantity: vine.number().min(1),
})

export const transactionProductUpdateValidator = vine.create({
  productId: vine.number().optional(),
  transactionId: vine.number().optional(),
  quantity: vine.number().min(1).optional(),
})



export const paymentDataValidator = vine.create({
    
  amount: vine
    .number()
    .positive(),

  name: vine
    .string()
    .trim()
    .minLength(2),

  email: vine
    .string()
    .email()
    .trim(),

  cardNumber: vine
    .string()
    .regex(/^[0-9]{16}$/),

  cvv: vine
    .string()
    .regex(/^[0-9]{3,4}$/),
})
