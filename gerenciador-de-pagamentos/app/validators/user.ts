import vine  from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})



/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})


// 1) Criamos o schema do usuário
export const userSchema = vine.object({
  fullName: vine.string().trim().minLength(3),
  email: vine.string().email(),
  password: vine.string().minLength(6),
})

// 2) Criamos o validator pré-compilado
export const userValidator = vine.create(userSchema)



export const updateUserValidator = vine.create({
  fullName: vine.string().trim().minLength(3).optional(),
  email: vine.string().email().optional(),
})

export const userCreateValidator = vine.create({
  email: vine.string().email().trim(),

  password: vine
    .string()
    .minLength(6),

  fullName: vine.string().trim().optional(),
})

export const userUpdatePrivilageValidator = vine.create({
  email: vine.string().email().trim().optional(),

  password: vine
    .string()
    .minLength(6)
    .optional(),

  fullName: vine.string().trim().optional(),

  role: vine.enum([
    'admin',
    'user',
    'manager',
    'finance'
  ])
})
