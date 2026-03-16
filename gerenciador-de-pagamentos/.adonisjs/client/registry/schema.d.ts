/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.user.update': {
    methods: ["PUT"]
    pattern: '/api/v1/account'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['update']>>>
    }
  }
  'profile.user.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['show']>>>
    }
  }
  'product.products.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['index']>>>
    }
  }
  'product.products.store': {
    methods: ["POST"]
    pattern: '/api/v1/product'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['store']>>>
    }
  }
  'product.products.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['show']>>>
    }
  }
  'product.products.update': {
    methods: ["PUT"]
    pattern: '/api/v1/product/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['update']>>>
    }
  }
  'product.products.find_by_name': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product/name/:name'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { name: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['findByName']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['findByName']>>>
    }
  }
  'product.products.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/product/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['destroy']>>>
    }
  }
  'product.products.list_by_user': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product/myProducts/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['listByUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['listByUser']>>>
    }
  }
  'product.products.show_by_user': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product/myProducts/detail/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products_controller').default['showByUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products_controller').default['showByUser']>>>
    }
  }
  'User.privilages.update_privilege': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/manager'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['UpdatePrivilege']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['UpdatePrivilege']>>>
    }
  }
  'User.privilages.list': {
    methods: ["POST"]
    pattern: '/api/v1/manager'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['list']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['list']>>>
    }
  }
  'User.privilages.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/manager/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['show']>>>
    }
  }
  'User.privilages.update': {
    methods: ["PUT"]
    pattern: '/api/v1/manager/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['update']>>>
    }
  }
  'User.privilages.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/manager/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/privilages_controller').default['destroy']>>>
    }
  }
  'gateway.gateways.list': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/gateway'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['list']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['list']>>>
    }
  }
  'gateway.gateways.create': {
    methods: ["POST"]
    pattern: '/api/v1/gateway'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/gateway').gatewayCreateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/gateway').gatewayCreateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gateway.gateways.update': {
    methods: ["PUT"]
    pattern: '/api/v1/gateway/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['update']>>>
    }
  }
  'gateway.gateways.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/gateway/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateways_controller').default['destroy']>>>
    }
  }
  'transaction.transaction.list': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transaction'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['list']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['list']>>>
    }
  }
  'transaction.transaction.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transaction/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['show']>>>
    }
  }
  'transaction.transaction.refund': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transaction/finance/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['refund']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['refund']>>>
    }
  }
  'transaction.transaction.payment': {
    methods: ["POST"]
    pattern: '/api/v1/transaction'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/transaction').transactionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/transaction').transactionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['payment']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['payment']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'transaction.transaction.list_by_user': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transaction/myTransactions/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['listByUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['listByUser']>>>
    }
  }
  'transaction.transaction.show_by_user': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/transaction/myTransactions/detail/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['showByUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transaction_controller').default['showByUser']>>>
    }
  }
}
