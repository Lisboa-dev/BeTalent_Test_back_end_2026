/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    user: {
      update: typeof routes['profile.user.update']
      show: typeof routes['profile.user.show']
    }
  }
  product: {
    products: {
      index: typeof routes['product.products.index']
      store: typeof routes['product.products.store']
      show: typeof routes['product.products.show']
      update: typeof routes['product.products.update']
      findByName: typeof routes['product.products.find_by_name']
      destroy: typeof routes['product.products.destroy']
      listByUser: typeof routes['product.products.list_by_user']
      showByUser: typeof routes['product.products.show_by_user']
    }
  }
  user: {
    privilages: {
      updatePrivilege: typeof routes['User.privilages.update_privilege']
      list: typeof routes['User.privilages.list']
      show: typeof routes['User.privilages.show']
      update: typeof routes['User.privilages.update']
      destroy: typeof routes['User.privilages.destroy']
    }
  }
  gateway: {
    gateways: {
      list: typeof routes['gateway.gateways.list']
      create: typeof routes['gateway.gateways.create']
      update: typeof routes['gateway.gateways.update']
      destroy: typeof routes['gateway.gateways.destroy']
    }
  }
  transaction: {
    transaction: {
      list: typeof routes['transaction.transaction.list']
      show: typeof routes['transaction.transaction.show']
      refund: typeof routes['transaction.transaction.refund']
      payment: typeof routes['transaction.transaction.payment']
      listByUser: typeof routes['transaction.transaction.list_by_user']
      showByUser: typeof routes['transaction.transaction.show_by_user']
    }
  }
}
