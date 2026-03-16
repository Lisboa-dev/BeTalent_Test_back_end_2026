import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.user.update': { paramsTuple?: []; params?: {} }
    'profile.user.show': { paramsTuple?: []; params?: {} }
    'product.products.index': { paramsTuple?: []; params?: {} }
    'product.products.store': { paramsTuple?: []; params?: {} }
    'product.products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.find_by_name': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'product.products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.list_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.show_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.update_privilege': { paramsTuple?: []; params?: {} }
    'User.privilages.list': { paramsTuple?: []; params?: {} }
    'User.privilages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.gateways.list': { paramsTuple?: []; params?: {} }
    'gateway.gateways.create': { paramsTuple?: []; params?: {} }
    'gateway.gateways.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.gateways.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.list': { paramsTuple?: []; params?: {} }
    'transaction.transaction.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.payment': { paramsTuple?: []; params?: {} }
    'transaction.transaction.list_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.show_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.user.show': { paramsTuple?: []; params?: {} }
    'product.products.index': { paramsTuple?: []; params?: {} }
    'product.products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.find_by_name': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'product.products.list_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.show_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.update_privilege': { paramsTuple?: []; params?: {} }
    'User.privilages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.gateways.list': { paramsTuple?: []; params?: {} }
    'transaction.transaction.list': { paramsTuple?: []; params?: {} }
    'transaction.transaction.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.list_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.show_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.user.show': { paramsTuple?: []; params?: {} }
    'product.products.index': { paramsTuple?: []; params?: {} }
    'product.products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.find_by_name': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'product.products.list_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.products.show_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.update_privilege': { paramsTuple?: []; params?: {} }
    'User.privilages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.gateways.list': { paramsTuple?: []; params?: {} }
    'transaction.transaction.list': { paramsTuple?: []; params?: {} }
    'transaction.transaction.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.list_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'transaction.transaction.show_by_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'product.products.store': { paramsTuple?: []; params?: {} }
    'User.privilages.list': { paramsTuple?: []; params?: {} }
    'gateway.gateways.create': { paramsTuple?: []; params?: {} }
    'transaction.transaction.payment': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profile.user.update': { paramsTuple?: []; params?: {} }
    'product.products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.gateways.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'product.products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'User.privilages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.gateways.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}