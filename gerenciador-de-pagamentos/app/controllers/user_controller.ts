
import UserService from '#services/user_service'
import { updateUserValidator } from '#validators/user'
import sanitizeDTO from '#validators/sanitize'
import {}from '../types/userDTO.ts'
import type { HttpContext, HttpRequest } from '@adonisjs/core/http'



export default class UsersController {

    private userService = new UserService()


    async show({auth, response}: HttpContext) {
        const id= auth.user?.id
        if(!id) return  response.unauthorized()
        return await this.userService.showByUser(id)
       
    }

    async update ({auth, request, response}: HttpContext) {
        const id= auth.user?.id
        if(!id) return response.unauthorized()
        const data= await request.validateUsing(updateUserValidator)
       if(data.email || data.fullName){
        return await this.userService.updateByUser(id, data)
      }
       return response.badRequest()
    }

   
}
