import vine  from '@vinejs/vine'



export const productCreateValidator = vine.create({
  name: vine.string().trim(),

  status: vine
    .enum(['in_stock', 'not_stock'])
    ,

  description: vine
    .string()
    .trim()
    ,

  amount: vine
    .number()
    .positive()
    ,

  stock: vine
    .number()
    .min(0)
    ,
})


export const productUpdateValidator = vine.create({
  name: vine.string().trim().optional(),

  status: vine
    .enum(['in_stock', 'not_stock'])
    .optional(),

  description: vine
    .string()
    .trim()
    .optional(),

  amount: vine
    .number()
    .positive()
    .optional(),

  stock: vine
    .number()
    .min(0)
    .optional(),
})


export const productInTransactionValidator = vine.create({
 id:vine.number().positive(),
 quantity: vine.number().positive(),
})
