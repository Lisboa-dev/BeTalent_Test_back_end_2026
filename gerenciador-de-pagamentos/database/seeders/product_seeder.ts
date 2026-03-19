
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import Client from '#models/client'
import Gateway from '#models/gateways'
import Product from '#models/product'
import Transaction from '#models/transactions'
import TransactionProduct from '#models/transactions_products'


export default class DatabaseSeeder extends BaseSeeder {
  logger: any
  public async run() {

    const usersData = [
      { fullName: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' },
      { fullName: 'Manager User', email: 'manager@example.com', password: 'password', role: 'manager' },
      { fullName: 'Finance User', email: 'finance@example.com', password: 'password', role: 'finance' },
      { fullName: 'Regular User 1', email: 'user1@example.com', password: 'password', role: 'user' },
      { fullName: 'Regular User 2', email: 'user2@example.com', password: 'password', role: 'user' },
      { fullName: 'Regular User 3', email: 'user3@example.com', password: 'password', role: 'user' },
      { fullName: 'Regular User 4', email: 'user4@example.com', password: 'password', role: 'user' },
    ]

    const users: User[] = []
    for (const userData of usersData) {
      const hashedPassword = userData.password
      const user = await User.firstOrCreate({ email: userData.email }, { ...userData, password: hashedPassword })
      users.push(user)
    }

    // 2. Seed Clients
    const clientsData = [
      { name: 'Client A', email: 'clienta@example.com' },
      { name: 'Client B', email: 'clientb@example.com' },
      { name: 'Client C', email: 'clientc@example.com' },
      { name: 'Client D', email: 'clientd@example.com' },
      { name: 'Client E', email: 'cliente@example.com' },
      { name: 'Client F', email: 'clientf@example.com' },
      { name: 'Client G', email: 'clientg@example.com' },
    ]

    const clients: Client[] = []
    for (const clientData of clientsData) {
      const client = await Client.firstOrCreate({ email: clientData.email }, clientData)
      clients.push(client)
    }

    // 3. Seed Gateways
    const gatewaysData = [
      { name: 'Stripe', isActive: true, priority: 10 },
      { name: 'PayPal', isActive: true, priority: 11},
      { name: 'PagSeguro', isActive: false, priority: 13},
      { name: 'Mercado Pago', isActive: true, priority: 14},
      { name: 'Stone', isActive: true, priority: 15},
    ]

    const gateways: Gateway[] = []
    for (const gatewayData of gatewaysData) {
      const gateway = await Gateway.firstOrCreate({ name: gatewayData.name }, gatewayData)
      gateways.push(gateway)
    }

    // 4. Seed Products
    const productsData = [
      { name: 'Product 1', description: 'Description for Product 1', price: 1050, stock: 100, status: 'in_stock' },
      { name: 'Product 2', description: 'Description for Product 2', price: 2000, stock: 50, status: 'in_stock' },
      { name: 'Product 3', description: 'Description for Product 3', price: 575, stock: 0, status: 'not_stock' },
      { name: 'Product 4', description: 'Description for Product 4', price: 1520, stock: 200, status: 'in_stock' },
      { name: 'Product 5', description: 'Description for Product 5', price: 3000, stock: 75, status: 'in_stock' },
    ]

    const products: Product[] = []
    for (const productData of productsData) {
      const product = await Product.firstOrCreate({ name: productData.name }, productData)
      products.push(product)
    }

    // 5. Seed Transactions
    const transactionsData = [
      {
        cardLastNumbers: '1234', client: clients[0].id, externalId: 'ext_trans_001', gatewayId: gateways[0].id,
        idempotencyKey: 'idemp_key_001', status: 'approved', value: 100
      },
      {
        cardLastNumbers: '5678', client: clients[1].id, externalId: 'ext_trans_002', gatewayId: gateways[1].id,
        idempotencyKey: 'idemp_key_002', status: 'pending', value: 4000
      },
      {
        cardLastNumbers: '9012', client: clients[2].id, externalId: 'ext_trans_003', gatewayId: gateways[0].id,
        idempotencyKey: 'idemp_key_003', status: 'rejected', value: 575
      },
      {
        cardLastNumbers: '3456', client: clients[3].id, externalId: 'ext_trans_004', gatewayId: gateways[3].id,
        idempotencyKey: 'idemp_key_004', status: 'refunded', value: 3040
      },
      {
        cardLastNumbers: '7890', client: clients[4].id, externalId: 'ext_trans_005', gatewayId: gateways[4].id,
        idempotencyKey: 'idemp_key_005', status: 'approved', value: 6000
      },
    ]

    const transactions: Transaction[] = []
    for (const transactionData of transactionsData) {
      const transaction = await Transaction.firstOrCreate({ idempotencyKey: transactionData.idempotencyKey }, transactionData)
      transactions.push(transaction)
    }

    // 6. Seed TransactionProducts (linking products to transactions)
    const transactionProductsData = [
      { transactionId: transactions[0].id, productId: products[0].id, quantity: 1 },
      { transactionId: transactions[1].id, productId: products[1].id, quantity: 2 },
      { transactionId: transactions[1].id, productId: products[4].id, quantity: 1 },
      { transactionId: transactions[2].id, productId: products[2].id, quantity: 1 },
      { transactionId: transactions[3].id, productId: products[3].id, quantity: 2 },
      { transactionId: transactions[4].id, productId: products[0].id, quantity: 3 },
    ]

    for (const tpData of transactionProductsData) {
      await TransactionProduct.firstOrCreate({ transactionId: tpData.transactionId, productId: tpData.productId }, tpData)
    }

    console.log('Database seeded successfully!')
  }
}