import Gateways from "#models/product";
import type{GatewayCreateDTO} from "../types/gatewayDTO.ts"
import redis from '@adonisjs/redis/services/main'

export default class GatewayService {

  // Cria um gateway
  async create(data: GatewayCreateDTO) {
    try {
      const gateway = await Gateways.create(data)
      await redis.set(`gateway:${gateway.id}`, JSON.stringify(gateway))
      return gateway
    } catch (error) {
      throw new Error(`Erro ao criar gateway: ${error}`)
    }
  }

  // Atualiza um gateway pelo id
  async update(id: number, data: GatewayCreateDTO) {
    try {
      const gateway = await Gateways.findByOrFail('id', id)
      gateway.merge(data) // merge não é async
      await gateway.save()
      await redis.set(`gateway:${gateway.id}`, JSON.stringify(gateway))
      return gateway
    } catch (error) {
      throw new Error(`Erro ao atualizar gateway ${id}: ${error}`)
    }
  }

  // Deleta um gateway pelo id
  async delete(id: number) {
    try {
      const gateway = await Gateways.findByOrFail('id', id)
      await gateway.delete()
      await redis.del(`gateway:${gateway.id}`)
      return gateway
    } catch (error) {
      throw new Error(`Erro ao deletar gateway ${id}: ${error}`)
    }
  }

  async list() {
    try {
      return await Gateways.all()
    } catch (error) {
      throw new Error(`Erro ao listar gateways: ${error}`)
    }
  }

}