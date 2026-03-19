import { BaseSeeder } from '@adonisjs/lucid/seeders'
import redis from '@adonisjs/redis/services/main'
import Hash from '@adonisjs/core/services/hash'
import Gateway from '#models/gateways'
import User from '#models/user'

interface GatewayItem {
  name: string
  priority: number
}

export default class InitialSeeder extends BaseSeeder {
  public async run () {
    try {
      await new Promise(res => setTimeout(res, 4000)) // delay opcional para garantir DB ready

      // 1️⃣ Lista de gateways
      const listGateways: GatewayItem[] = [
        { name: 'gateway1', priority: 1 },
        { name: 'gateway2', priority: 2 },
      ]

      // 2️⃣ Registrar gateways usando o modelo Gateway
      for (const gatewayData of listGateways) {
        let gateway = await Gateway.findBy('name', gatewayData.name)

        if (!gateway) {
          gateway = await Gateway.create({
            name: gatewayData.name,
            priority: gatewayData.priority,
            isActive: true,
          })
        }

        // Salvar no Redis
        const redisKey = `gateway:${gateway.name}`
        await redis.set(redisKey, JSON.stringify({
          name: gateway.name,
          priority: gateway.priority,
          isActive: gateway.isActive
        }))
      }

      // 3️⃣ Registrar admin user usando o modelo User
      const adminEmail = 'admin@system4.com'
      const adminPassword = 'admin123'
      let adminUser = await User.findBy('email', adminEmail)

      if (!adminUser) {
        await User.create({
          fullName: 'admin',
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
        })
      }
      console.log('Seeder completed successfully ✅')
    } catch (error) {
      console.error('Seeder failed ❌', error)
    }
  }
}