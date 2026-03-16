import Product from "#models/product";
import Transactions from "#models/transactions";
import TransactionsProducts from "#models/transactions_products";


export default class ProductService {

  // Cria um produto
  async create(data: { name: string; description?: string; stock: number, price:number }) {
    try {
      const product = await Product.create(data)
      return product
    } catch (error) {
      throw new Error(`Erro ao criar produto: ${error}`)
    }
  }

  // Busca produto pelo ID
  async findById(id: number) {
    try {
      return await Product.findOrFail(id)
    } catch (error) {
      throw new Error(`Produto com ID ${id} não encontrado: ${error}`)
    }
  }

  // Lista produtos com cursor pagination
  async findAll(cursor?: number, limit = 10) {
    try {
      limit = Math.min(limit, 50)

      const query = Product.query()
        .orderBy('id', 'asc')
        .limit(limit)
        .select('id', 'name', 'description', 'stock', 'status')
      if (cursor) {
        query.where('id', '>', cursor)
      }

      const products = await query

      return {
        data: products,
        nextCursor: products.length
          ? products[products.length - 1].id
          : null
      }
    } catch (error) {
      throw new Error(`Erro ao listar produtos: ${error}`)
    }
  }

  // Atualiza produto pelo ID
  async update(id: number, data: { name?: string; description?: string; amount?: number }) {
    try {
      const product = await Product.findOrFail(id)
      product.merge(data)
      await product.save()
      return product
    } catch (error) {
      throw new Error(`Erro ao atualizar produto ${id}: ${error}`)
    }
  }

  // Deleta produto pelo ID
  async delete(id: number) {
    try {
      const product = await Product.findOrFail(id)
      await product.delete()
      return product
    } catch (error) {
      throw new Error(`Erro ao deletar produto ${id}: ${error}`)
    }
  }

  // Busca produto pelo nome
  async findByName(name: string) {
    try {
      return await Product.findByOrFail('name', name)
    } catch (error) {
      throw new Error(`Produto com nome "${name}" não encontrado: ${error}`)
    }
  }

  // Busca produtos pelo status
  async findByStatus(status: 'in_stock' | 'not_stock') {
    try {
      return await Product.query().where('status', status)
    } catch (error) {
      throw new Error(`Erro ao buscar produtos com status "${status}": ${error}`)
    }
  }

  // Atualiza estoque do produto
  async updateStock(id: number, stock: number) {
    try {
      const product = await Product.findOrFail(id)
      product.stock = stock
      await product.save()
      return product
    } catch (error) {
      throw new Error(`Erro ao atualizar estoque do produto ${id}: ${error}`)
    }
  }

  
  async findAllInUser(userId: number) {
    try {
      // Busca todas as transações do usuário
      const transactions = await Transactions.query()
        .where('client', userId)
        .preload('itens', (query) => {
          query.preload('product') // assume relação TransactionProduct → Product
        })

      // Extrai todos os produtos das transações
      const products: Product[] = []
      for (const transaction of transactions) {
        for (const tp of transaction.itens) {
          if (tp.product) products.push(tp.product)
        }
      }

      // Remove duplicados pelo id
      const uniqueProducts = Array.from(new Map(products.map(p => [p.id, p])).values())

      return uniqueProducts
    } catch (error) {
      throw new Error(`Erro ao buscar produtos do usuário ${userId}: ${error}`)
    }
  }

  async detailProductByUser(userId: number, productId: number) {
    try {
      // Busca transações do usuário que contenham o produto
      const transactionProduct = await TransactionsProducts.query()
        .whereHas('transaction', (query) => query.where('client', userId))
        .where('product_id', productId)
        .preload('product')
        .firstOrFail()

      return transactionProduct.product
    } catch (error) {
      throw new Error(`Produto ${productId} do usuário ${userId} não encontrado: ${error}`)
    }
  }
  }