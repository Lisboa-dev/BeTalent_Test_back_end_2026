  import User from '#models/user'
  import {ClientSchema} from '#database/schema'
  import type { UpdateUserDTO,AdminUpdateUserDTO } from '../types/userDTO.ts'
  export default class UserService {


  // Atualiza privilégios de admin
   async updatePrivilege(userId: number, data: AdminUpdateUserDTO) {
    try {
      const user = await User.findOrFail(userId)
      user.merge(data)
      await user.save()
      return user
    } catch (error) {
      throw new Error(`Erro ao atualizar privilégios do usuário ${userId}: ${error}`)
    }
  }

  // Atualiza dados do usuário
   async update(userId: number, data: UpdateUserDTO) {
    try {
      const user = await User.findOrFail(userId)
      user.merge(data)
      await user.save()
      return {
        name:user.fullName,
        email:user.email
      }
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário ${userId}: ${error}`)
    }
  }

  // Deleta usuário
   async delete(userId: number) {
    try {
      const user = await User.findOrFail(userId)
      await user.delete()
      return user
    } catch (error) {
      throw new Error(`Erro ao deletar usuário ${userId}: ${error}`)
    }
  }



  // Busca por id
   async show(id: number) {
    try {
      return await User.findOrFail(id)
    } catch (error) {
      throw new Error(`Usuário com id ${id} não encontrado: ${error}`)
    }
  }

  // Lista todos
   async list() {
    try {
      return await User.all()
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error}`)
    }
  }


    async showByUser(id: number){
      try {
        const user = await User.findOrFail(id)
        return {name:user.fullName ,email:user.email, id:user.id, }
      } catch (error) {
        throw new Error(`Erro ao listar usuários: ${error}`)
      }
    }

    async updateByUser(id:number, data: UpdateUserDTO) {
      try {
        const user = await User.findByOrFail('id', id)
        user.merge(data)
        await user.save()
        return user

      } catch (error) {
        throw new Error(`Erro ao listar usuários: ${error}`)
      }

    }

    async listClients() {
      try {
        return await ClientSchema.all()
      } catch (error) {
        throw new Error(`Erro ao listar clientes: ${error}`)
      }
    }

}