
import GatewayService from '#services/gateway_service'
import {gatewayCreateValidator, gatewayUpdateValidator  } from '#validators/gateway'
import sanitizeDTO from '#validators/sanitize'
import {}from '../types/userDTO.ts'
import type { HttpContext } from '@adonisjs/core/http'


export default class GatwaysController{
    private gatewayService = new GatewayService()

    async create({request}: HttpContext){
        const data= await request.validateUsing(gatewayCreateValidator)
         await this.gatewayService.create(data)
    }
    async list({}: HttpContext){
        await this.gatewayService.list()
    }
    async update({request, params}: HttpContext){
        const cleanData= sanitizeDTO(request.all())
        const data= await cleanData.validateUsing(gatewayUpdateValidator)
         await this.gatewayService.update(params.id, data)
    }
    async destroy({params}: HttpContext){
        await  await this.gatewayService.delete(Number(params.id))
    }

}