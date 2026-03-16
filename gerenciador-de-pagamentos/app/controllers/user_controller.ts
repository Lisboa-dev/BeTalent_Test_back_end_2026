
import UserService from '#services/user_service'
import { updateUserValidator } from '#validators/user'
import sanitizeDTO from '#validators/sanitize'
import {}from '../types/userDTO.ts'
import type { HttpContext } from '@adonisjs/core/http'



export default class UsersController {

    private userService = new UserService()


    async show({auth}: HttpContext) {
        const id= auth.user?.id
        if(!id) return
       return await this.userService.showByUser(id)
    }

    async update ({auth, request}: HttpContext) {
        const id= auth.user?.id
        if(!id) return
        const cleanData= sanitizeDTO(request.all())
        const data= await cleanData.validateUsing(updateUserValidator)
        this.userService.updateByUser(id, data)
    }

   
}
