import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const swagger = {
  path: 'docs',

  info: {
    title: 'Payment Manager API',
    version: '1.0.0',
    description: 'API para gerenciamento de pagamentos'
  },

  tagIndex: 2,

  snakeCase: true,

  ignore: ['/swagger', '/docs'],

  controllerPath:  join(__dirname, '../app/controllers'),

  common: {
    parameters: {},
    headers: {}
  },

 
}

export default swagger