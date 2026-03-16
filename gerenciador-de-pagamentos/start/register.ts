import Gateways from "#models/gateways"
import redis from '@adonisjs/redis/services/main'
import User from '#models/user'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

interface GatewayItem {
  name: string
  priority: number
}

export default async function register() {
  try {

     await delay(4000)
    // 1️⃣ Lista de gateways
    const listGateways: GatewayItem[] = [
      { name: 'Gateway1', priority: 1 },
      { name: 'Gateway2', priority: 2 },
    ]

    // 2️⃣ Registrar gateways no MySQL e Redis
    for (const gateway of listGateways) {
      // Checa se já existe no banco
      let existing = await Gateways.query().where('name', gateway.name).first()
      let newGateway
      if (!existing) {
        newGateway = await Gateways.create({
          name: gateway.name,
          priority: gateway.priority,
          isActive: true,
        })
      } else {
        newGateway = existing
      }

      // Salvar no Redis
      const redisKey = `gateway:${gateway.name}`
      await redis.set(redisKey, JSON.stringify({
        name: newGateway.name,
        priority: newGateway.priority,
        isActive: newGateway.isActive
      })) 

      if (newGateway.name !== gateway.name) {
        return { message: 'register to ' + gateway.name + ' failed' }
      }
    }

    // 3️⃣ Registrar admin user
    const adminEmail = 'admin@system2.com'
    const adminPassword = 'admin12345' // trocar para algo seguro em produção
    let admin = await User.query().where('email', adminEmail).first()
    if (!admin) {
      admin = await User.create({
        fullName: 'admin',
        email: adminEmail,
        password: adminPassword, // se usar hash, aqui colocar hash
        role: 'admin',
      })
    }

    return { message: 'success', admin: admin.$original, gatways: listGateways}

  } catch (error) {
    console.error('Register error:', error)
    return { message: 'failed', error: error.message }
  }
}



// Rodar a função
//register().then(res => console.log(res))


 