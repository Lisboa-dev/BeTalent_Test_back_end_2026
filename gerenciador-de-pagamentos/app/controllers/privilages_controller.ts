// import type { HttpContext } from '@adonisjs/core/http'

import UserService from "#services/user_service"
import sanitizeDTO from "#validators/sanitize"
import { userUpdatePrivilageValidator, updateUserValidator } from "#validators/user"
import { HttpContext } from "@adonisjs/core/http"



export default class PrivilegesController {

   private userService = new UserService()


 async updatePrivilege({ auth, request, params, response }: HttpContext) {
  const id = auth.user?.id

  if (!id) {
    return response.unauthorized()
  }
 
  const data = await request.validateUsing(userUpdatePrivilageValidator)
  const finalData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  )
  console.log('validate data')
   console.log(data)
    console.log('final data')
    console.log(finalData)


   const update = await this.userService.updatePrivilege(
    Number(params.id),
    finalData
  ) 
    console.log('update')
   console.log(update.$attributes)

  return update
}
     
    /**
     * Return a user by id
     * @param {HttpContext} request
     * @returns {Promise<User>}
     */

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