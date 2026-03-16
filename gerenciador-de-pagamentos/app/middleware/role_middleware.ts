
import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>, roles: string[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized()
    }

    if (!roles.includes(user.role??'user')) {
      return ctx.response.forbidden({
        message: 'Você não tem permissão para acessar esta rota',
      })
    }

    await next()
  }
}