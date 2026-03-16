import type { HttpContext } from '@adonisjs/core/http'
import ProductService from "#services/product_service";
export default class ProductsController {
    
       private productService = new ProductService()
    
      async index({ request,  params }: HttpContext){
        const limit = Number(request.input('limit', 10))
        const cursor = request.input('cursor')


        return this.productService.findAll(cursor, limit)
      }
    
      async show({ request,  params }: HttpContext) {
        const id = parseInt(params.id, 10)
        return this.productService.findById(id)
      }
    
      async store({ request,  params }: HttpContext) {
        const { name, description, stock, price} = request.only(['name', 'description', 'stock', 'price'])
        return this.productService.create({ name, description, stock, price})
      }
    
      async update({ request,  params }: HttpContext) {
        const id = parseInt(params.id, 10)
        const { name, description, amount } = request.only(['name', 'description', 'amount'])
        return this.productService.update(id, { name, description, amount })
      }
    
      async destroy({ request,  params }: HttpContext) {
        const id = parseInt(params.id, 10)
        return this.productService.delete(id)
      } 

      async findByName ({ request,  params }: HttpContext) {
        const name = params.name
        return this.productService.findByName(name)
        
      }

      async listByUser ({ request,  params }: HttpContext) {
        const id = params.id
        return this.productService.findAllInUser(parseInt(id, 10))
        
      }

      async showByUser ({ request,  params }: HttpContext) {
        const id = params.id
        const productId = params.productId
        return this.productService.detailProductByUser(parseInt(id, 10), parseInt(productId, 10))
        
      }
}