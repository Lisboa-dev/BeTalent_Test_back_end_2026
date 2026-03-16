/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { toUSVString } from 'util'

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
      router
        .group(() => {
          router.post('signup', [controllers.NewAccount, 'store'])
          router.post('login', [controllers.AccessToken, 'store'])
          router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
        })
        .prefix('auth')
        .as('auth')
        
     
      router
        .group(() => {
          router.get('/profile', [controllers.Profile, 'show']),
          router.put('/', [controllers.User, 'update']).use(middleware.auth()),
          router.get('/', [controllers.User, 'show']).use(middleware.auth())

        })
        .prefix('account')
        .as('profile')


      router
        .group(() => {
          router.get('/', [controllers.Products, 'index']),
          router.post('/', [controllers.Products, 'store']).use(middleware.auth()).use(middleware.role(['admin', 'manager', 'finance'])),
          router.get('/:id', [controllers.Products, 'show']),
          router.put('/:id', [controllers.Products, 'update']).use(middleware.auth()).use(middleware.role(['admin', 'manager', 'finance'])),
          router.get('/name/:name', [controllers.Products, 'findByName']),
          router.delete('/:id', [controllers.Products, 'destroy']).use(middleware.auth()).use(middleware.role(['admin', 'manager', 'finance'])),
          router.get('/myProducts/:id', [controllers.Products, 'listByUser']).use(middleware.auth()),
          router.get('/myProducts/detail/:id', [controllers.Products, 'showByUser']).use(middleware.auth())
        })
        .prefix('product')
        .as('product')
        

      router 
        .group(() => {
          router.get('/', [controllers.Privilages, 'UpdatePrivilege']).use(middleware.auth()).use(middleware.role(['admin'])),
          router.post('/', [controllers.Privilages, 'list']).use(middleware.auth()).use(middleware.auth()).use(middleware.role(['admin', 'manager', ])),
          router.get('/:id', [controllers.Privilages, 'show']).use(middleware.auth()).use(middleware.role(['admin', 'manager', ])),
          router.put('/:id', [controllers.Privilages, 'update']).use(middleware.auth()).use(middleware.role(['admin', 'manager', ])),
          router.delete('/:id', [controllers.Privilages, 'destroy']).use(middleware.auth()).use(middleware.role(['admin', 'manager', ]))
        })
        .prefix('manager')
        .as('User')


      router
        .group(() => {
          router.get('/', [controllers.Gateways, 'list']).use(middleware.auth()).use(middleware.role(['admin' ])),
          router.post('/', [controllers.Gateways, 'create']).use(middleware.auth()).use(middleware.role(['admin' ])),
          router.put('/:id', [controllers.Gateways, 'update']).use(middleware.auth()).use(middleware.role(['admin' ])),
          router.delete('/:id', [controllers.Gateways, 'destroy']).use(middleware.auth()).use(middleware.role(['admin' ]))
        })
        .prefix('gateway')
        .as('gateway')

      router
        .group(() => {
          router.get('/', [controllers.Transaction, 'list']).use(middleware.auth()).use(middleware.role(['admin', 'finance', ])),
          router.get('/:id', [controllers.Transaction, 'show']).use(middleware.auth()).use(middleware.role(['admin', 'finance', ])),
          router.get('/finance/:id',[ controllers.Transaction, 'refund']).use(middleware.auth()).use(middleware.role(['admin', 'finance' ]))
          router.post('/',[ controllers.Transaction, 'payment'])
          router.get('/myTransactions/:id', [controllers.Transaction, 'listByUser']).use(middleware.auth())
          router.get('/myTransactions/detail/:id', [controllers.Transaction, 'showByUser']).use(middleware.auth())
        })
        .prefix('transaction')
        .as('transaction')
        

  })
  .prefix('/api/v1')
