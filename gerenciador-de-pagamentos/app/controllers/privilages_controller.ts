// import type { HttpContext } from '@adonisjs/core/http'

import UserService from "#services/user_service"
import sanitizeDTO from "#validators/sanitize"
import { userUpdatePrivilageValidator, updateUserValidator } from "#validators/user"
import { HttpContext } from "@adonisjs/core/http"



export default class PrivilegesController {

   private userService = new UserService()


   async UpdatePrivilege({auth, request}: HttpContext) {
        const id= auth.user?.id
        if(!id) return
        const cleanData= sanitizeDTO(request.all())
        const data= await cleanData.validateUsing(userUpdatePrivilageValidator)
       return await this.userService.updatePrivilege(id, data)
   }
     
    async show({ request}: HttpContext) {
        const id= Number(request.param('id').id)
       return await this.userService.show(id)
    }
    
    async list({}: HttpContext) {
       return await this.userService.list()
    }


    async update({request}: HttpContext) {
        const id= Number(request.param('id').id)
        if(!id) return
        const cleanData= sanitizeDTO(request.all())
        const data= await cleanData.validateUsing(updateUserValidator)
        this.userService.update(id, data)
    }

    async destroy({params}:HttpContext){
        this.userService.delete(Number(params.id))
    }

    async listClients({}: HttpContext) {
        return await this.userService.listClients()
    }
     
}