/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.user.update': {
    methods: ["PUT"],
    pattern: '/api/v1/account',
    tokens: [{"old":"/api/v1/account","type":0,"val":"api","end":""},{"old":"/api/v1/account","type":0,"val":"v1","end":""},{"old":"/api/v1/account","type":0,"val":"account","end":""}],
    types: placeholder as Registry['profile.user.update']['types'],
  },
  'profile.user.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account',
    tokens: [{"old":"/api/v1/account","type":0,"val":"api","end":""},{"old":"/api/v1/account","type":0,"val":"v1","end":""},{"old":"/api/v1/account","type":0,"val":"account","end":""}],
    types: placeholder as Registry['profile.user.show']['types'],
  },
  'product.products.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/product',
    tokens: [{"old":"/api/v1/product","type":0,"val":"api","end":""},{"old":"/api/v1/product","type":0,"val":"v1","end":""},{"old":"/api/v1/product","type":0,"val":"product","end":""}],
    types: placeholder as Registry['product.products.index']['types'],
  },
  'product.products.store': {
    methods: ["POST"],
    pattern: '/api/v1/product',
    tokens: [{"old":"/api/v1/product","type":0,"val":"api","end":""},{"old":"/api/v1/product","type":0,"val":"v1","end":""},{"old":"/api/v1/product","type":0,"val":"product","end":""}],
    types: placeholder as Registry['product.products.store']['types'],
  },
  'product.products.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/product/:id',
    tokens: [{"old":"/api/v1/product/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product/:id","type":0,"val":"product","end":""},{"old":"/api/v1/product/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.products.show']['types'],
  },
  'product.products.update': {
    methods: ["PUT"],
    pattern: '/api/v1/product/:id',
    tokens: [{"old":"/api/v1/product/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product/:id","type":0,"val":"product","end":""},{"old":"/api/v1/product/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.products.update']['types'],
  },
  'product.products.find_by_name': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/product/name/:name',
    tokens: [{"old":"/api/v1/product/name/:name","type":0,"val":"api","end":""},{"old":"/api/v1/product/name/:name","type":0,"val":"v1","end":""},{"old":"/api/v1/product/name/:name","type":0,"val":"product","end":""},{"old":"/api/v1/product/name/:name","type":0,"val":"name","end":""},{"old":"/api/v1/product/name/:name","type":1,"val":"name","end":""}],
    types: placeholder as Registry['product.products.find_by_name']['types'],
  },
  'product.products.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/product/:id',
    tokens: [{"old":"/api/v1/product/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product/:id","type":0,"val":"product","end":""},{"old":"/api/v1/product/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.products.destroy']['types'],
  },
  'product.products.list_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/product/myProducts/:id',
    tokens: [{"old":"/api/v1/product/myProducts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product/myProducts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product/myProducts/:id","type":0,"val":"product","end":""},{"old":"/api/v1/product/myProducts/:id","type":0,"val":"myProducts","end":""},{"old":"/api/v1/product/myProducts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.products.list_by_user']['types'],
  },
  'product.products.show_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/product/myProducts/detail/:id',
    tokens: [{"old":"/api/v1/product/myProducts/detail/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product/myProducts/detail/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product/myProducts/detail/:id","type":0,"val":"product","end":""},{"old":"/api/v1/product/myProducts/detail/:id","type":0,"val":"myProducts","end":""},{"old":"/api/v1/product/myProducts/detail/:id","type":0,"val":"detail","end":""},{"old":"/api/v1/product/myProducts/detail/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.products.show_by_user']['types'],
  },
  'User.privilages.update_privilege': {
    methods: ["PUT"],
    pattern: '/api/v1/manager/:id/promote',
    tokens: [{"old":"/api/v1/manager/:id/promote","type":0,"val":"api","end":""},{"old":"/api/v1/manager/:id/promote","type":0,"val":"v1","end":""},{"old":"/api/v1/manager/:id/promote","type":0,"val":"manager","end":""},{"old":"/api/v1/manager/:id/promote","type":1,"val":"id","end":""},{"old":"/api/v1/manager/:id/promote","type":0,"val":"promote","end":""}],
    types: placeholder as Registry['User.privilages.update_privilege']['types'],
  },
  'User.privilages.list': {
    methods: ["POST"],
    pattern: '/api/v1/manager',
    tokens: [{"old":"/api/v1/manager","type":0,"val":"api","end":""},{"old":"/api/v1/manager","type":0,"val":"v1","end":""},{"old":"/api/v1/manager","type":0,"val":"manager","end":""}],
    types: placeholder as Registry['User.privilages.list']['types'],
  },
  'User.privilages.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/manager/:id',
    tokens: [{"old":"/api/v1/manager/:id","type":0,"val":"api","end":""},{"old":"/api/v1/manager/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/manager/:id","type":0,"val":"manager","end":""},{"old":"/api/v1/manager/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['User.privilages.show']['types'],
  },
  'User.privilages.update': {
    methods: ["PUT"],
    pattern: '/api/v1/manager/:id',
    tokens: [{"old":"/api/v1/manager/:id","type":0,"val":"api","end":""},{"old":"/api/v1/manager/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/manager/:id","type":0,"val":"manager","end":""},{"old":"/api/v1/manager/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['User.privilages.update']['types'],
  },
  'User.privilages.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/manager/:id',
    tokens: [{"old":"/api/v1/manager/:id","type":0,"val":"api","end":""},{"old":"/api/v1/manager/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/manager/:id","type":0,"val":"manager","end":""},{"old":"/api/v1/manager/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['User.privilages.destroy']['types'],
  },
  'gateway.gateways.list': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/gateway',
    tokens: [{"old":"/api/v1/gateway","type":0,"val":"api","end":""},{"old":"/api/v1/gateway","type":0,"val":"v1","end":""},{"old":"/api/v1/gateway","type":0,"val":"gateway","end":""}],
    types: placeholder as Registry['gateway.gateways.list']['types'],
  },
  'gateway.gateways.create': {
    methods: ["POST"],
    pattern: '/api/v1/gateway',
    tokens: [{"old":"/api/v1/gateway","type":0,"val":"api","end":""},{"old":"/api/v1/gateway","type":0,"val":"v1","end":""},{"old":"/api/v1/gateway","type":0,"val":"gateway","end":""}],
    types: placeholder as Registry['gateway.gateways.create']['types'],
  },
  'gateway.gateways.update': {
    methods: ["PUT"],
    pattern: '/api/v1/gateway/:id',
    tokens: [{"old":"/api/v1/gateway/:id","type":0,"val":"api","end":""},{"old":"/api/v1/gateway/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/gateway/:id","type":0,"val":"gateway","end":""},{"old":"/api/v1/gateway/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['gateway.gateways.update']['types'],
  },
  'gateway.gateways.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/gateway/:id',
    tokens: [{"old":"/api/v1/gateway/:id","type":0,"val":"api","end":""},{"old":"/api/v1/gateway/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/gateway/:id","type":0,"val":"gateway","end":""},{"old":"/api/v1/gateway/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['gateway.gateways.destroy']['types'],
  },
  'transaction.transaction.list': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transaction',
    tokens: [{"old":"/api/v1/transaction","type":0,"val":"api","end":""},{"old":"/api/v1/transaction","type":0,"val":"v1","end":""},{"old":"/api/v1/transaction","type":0,"val":"transaction","end":""}],
    types: placeholder as Registry['transaction.transaction.list']['types'],
  },
  'transaction.transaction.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transaction/:id',
    tokens: [{"old":"/api/v1/transaction/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transaction/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transaction/:id","type":0,"val":"transaction","end":""},{"old":"/api/v1/transaction/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transaction.transaction.show']['types'],
  },
  'transaction.transaction.refund': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transaction/finance/:id',
    tokens: [{"old":"/api/v1/transaction/finance/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transaction/finance/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transaction/finance/:id","type":0,"val":"transaction","end":""},{"old":"/api/v1/transaction/finance/:id","type":0,"val":"finance","end":""},{"old":"/api/v1/transaction/finance/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transaction.transaction.refund']['types'],
  },
  'transaction.transaction.payment': {
    methods: ["POST"],
    pattern: '/api/v1/transaction',
    tokens: [{"old":"/api/v1/transaction","type":0,"val":"api","end":""},{"old":"/api/v1/transaction","type":0,"val":"v1","end":""},{"old":"/api/v1/transaction","type":0,"val":"transaction","end":""}],
    types: placeholder as Registry['transaction.transaction.payment']['types'],
  },
  'transaction.transaction.list_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transaction/myTransactions/:id',
    tokens: [{"old":"/api/v1/transaction/myTransactions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transaction/myTransactions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transaction/myTransactions/:id","type":0,"val":"transaction","end":""},{"old":"/api/v1/transaction/myTransactions/:id","type":0,"val":"myTransactions","end":""},{"old":"/api/v1/transaction/myTransactions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transaction.transaction.list_by_user']['types'],
  },
  'transaction.transaction.show_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transaction/myTransactions/detail/:id',
    tokens: [{"old":"/api/v1/transaction/myTransactions/detail/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transaction/myTransactions/detail/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transaction/myTransactions/detail/:id","type":0,"val":"transaction","end":""},{"old":"/api/v1/transaction/myTransactions/detail/:id","type":0,"val":"myTransactions","end":""},{"old":"/api/v1/transaction/myTransactions/detail/:id","type":0,"val":"detail","end":""},{"old":"/api/v1/transaction/myTransactions/detail/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transaction.transaction.show_by_user']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
