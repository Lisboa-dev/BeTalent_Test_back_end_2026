import { test } from '@japa/runner'
import axios from 'axios'
import { assert } from 'console'
import { create } from 'domain'
import { exit } from 'process'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

 const createUserDto = {
     fullName: 'test',
     email: 'test@test.com',
     password: '12345678'
   }

  const createFinanceUserDto = {
     fullName: 'vbkajn',
     email: 'wfjkqndl@test.com',
     password: 'vhbkjsdaks'
  }

  const createManagerUserDto = {
     fullName: 'vhjacbkj',
     email: 'svkkcanlk@test.com',
     password: 'vhacsdsbkj'
  }
 
  const userAdmin ={
    fullName: 'admin',
    email: 'admin@system2.com',
    password: 'admin12345'
  }
  

async function createUser(data:{fullName: string, email: string, password:string}):Promise<{email:string, password:string, id:string}>{
      const response = await api.post('/api/v1/auth/signup', data)
      if(response.status === 200){
        return {
          id: response.data.user.id,
          email: response.data.user.email,
          password: data.password
        }
      }else{
        console.log(response.data)
        throw new Error('Erro ao criar o usuário')
      }
}


async function loginUser(){

   const user = await  createUser(createUserDto)

    const response = await api.post('/api/v1/auth/login', {
      email: user.email,
      password: user.password
    })
    return response.data.token
}

async function loginAdmin():Promise<string>{
   const response = await api.post('/api/v1/auth/login', {
      email: userAdmin.email,
      password: userAdmin.password
    })

    return response.data.token
}

async function loginFinance():Promise<string>{
      const user = await  createUser(createFinanceUserDto)

    const token = await loginAdmin()

    await api.post(`/api/v1/auth/manager/${user.id}`, {
     role: 'finance'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = await api.post('/api/v1/auth/login', {
      email: user.email,
      password: user.password
    })

    return response.data.token

}

async function loginManager():Promise<string>{
     const user = await  createUser(createManagerUserDto)

    const token = await loginAdmin()

     await api.post(`/api/v1/auth/manager/${user.id}`, {
     role: 'manager'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = await api.post('/api/v1/auth/login', {
      email: user.email,
      password: user.password
    })

    return response.data.token

}

async function listProducts(): Promise<{ id: string; name: string }[]> {
  const response = await api.get('/api/v1/product')

  return response.data.map((product: any) => ({
    id: product.id,
    name: product.name
  }))
}

test.group('API V1 - HTTP REAL', () => {

  /*
  |--------------------------------------------------------------------------
  | ROOT
  |--------------------------------------------------------------------------
  */

  test('GET /', async ({ assert }) => {

    const response = await api.get('/')

    assert.equal(response.status, 200)

  })


  /*
  |--------------------------------------------------------------------------
  | AUTH
  |--------------------------------------------------------------------------
  */

  test('signup user', async ({ assert }) => {

    const response = await api.post('/api/v1/auth/signup', {
      email: 'tesefft@test.com',
      password: 'vdffvdfgffg',
      fullName: 'test'
    })

    assert.equal(response.status, 200)

  })


  test('login user', async ({ assert }) => {

    const response = await api.post('/api/v1/auth/login', {
      email: 'tesefft@test.com',
      password: 'vdffvdfgffg'
    })

    assert.equal(response.status, 200)

  })
  
/*
  |--------------------------------------------------------------------------
  | User
  |--------------------------------------------------------------------------
  */

  test('profile user', async ({ assert }) => {

    const token = await loginUser()

    const response = await api.get('/api/v1/auth/account/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    assert.equal(response.status, 200)
  })

  test('ge data user loged', async ({ assert }) => {

    const token = await loginUser()

    const response = await api.get('/api/v1/auth/account/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    assert.equal(response.status, 200)
  })



  test('update user', async ({ assert }) => {
    const token = await loginUser()

    const response = await api.put('/api/v1/auth/account/', 
       {
      email: 'tesegft@test.com',
      password: 'vdffvdfgdffg',
       },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    assert.equal(response.status, 200)
  })





  /*
  |--------------------------------------------------------------------------
  | PRODUCTS
  |--------------------------------------------------------------------------
  */

  test('create product', async ({ assert }) => {
  const token = await loginAdmin()

  const requests = []

  for (let i = 0; i < 20; i++) {
    requests.push(
      api.post(
        '/api/v1/product',
        {
          name: `${i}`,
          description: `${i}`,
          stock: i * 5,
          price: i * 100
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    )
  }

  const responses = await Promise.all(requests)

  responses.forEach((res) => {
    assert.equal(res.status, 200)
  })
 
  })



  test('list products', async ({ assert }) => {

    const response = await api.get('/api/v1/product/')

    assert.equal(response.status, 200)

  })


  test('show product', async ({ assert }) => {

    const response = await api.get('/api/v1/product/1')

    assert.equal(response.status, 200)

  })


  test('find product by name', async ({ assert }) => {

    const response = await api.get('/api/v1/product/name/1')

    assert.equal(response.status, 200)

  })



 /*'
  |--------------------------------------------------------------------------
  | admin
  |--------------------------------------------------------------------------
  */






/*'
  |--------------------------------------------------------------------------
  | FINANCE
  |--------------------------------------------------------------------------
  */






  /*
  |--------------------------------------------------------------------------
  | MANAGER
  |--------------------------------------------------------------------------
  */

  test('manager list', async ({ assert }) => {

    try {

      await api.get('/api/v1/manager')

    } catch (error: any) {

      assert.equal(error.response.status, 401)

    }

  })










  /*
  |--------------------------------------------------------------------------
  | GATEWAYS
  |--------------------------------------------------------------------------
  */

  test('list gateways', async ({ assert }) => {

    try {
      const token = await loginAdmin()
      await api.get('/api/v1/gateway',{  
        headers: {
            Authorization: `Bearer ${token}`
          }})

    } catch (error: any) {

      assert.equal(error.response.status, 200)

    }

  })

  test('create gateway', async ({ assert }) => {
     const token = await loginAdmin()
     const response = await api.post('/api/v1/gateway/', {
        name: 'test',
        priority: 8,
        isActive: true
     },{
        headers: {
            Authorization: `Bearer ${token}`
          }
     })
     assert.equal(response.status, 200)
    
  })

  test('update gateway', async ({ assert }) => {
     const token = await loginAdmin()
     const response = await api.put('/api/v1/gateway/3', {
        name: 'test',
        priority: 20,
        isActive: false
     },{
        headers: {
            Authorization: `Bearer ${token}`
          }
     })
     assert.equal(response.status, 200)
    
  })

    test('destroy gateway', async ({ assert }) => {
     const token = await loginAdmin()
     const response = await api.put('/api/v1/gateway/3', {
        headers: {
            Authorization: `Bearer ${token}`
          }
     })
     assert.equal(response.status, 200)
    
  })


  /*
  |--------------------------------------------------------------------------
  | TRANSACTIONS
  |--------------------------------------------------------------------------
  */

 test('payment transaction', async ({ assert }) => {

    try {  
      const  product = await api.post('/api/v1/transaction/', 
          {
            payment:{
              name: 'test',
              email: 'test@test',
              cardNumber: '1234567890123456',
              cvv: '123'
            },
            products: [
              {
                productId: 1,
                quantity: 1
              }
            ],
            idempotency_key: '1234567890'
          }
      )
        assert.equal(product.status, 200)
    }catch{
      assert.fail('error')
    }

})

  test('list transactions', async ({ assert }) => {

    try {

      await api.get('/api/v1/transaction')

    } catch (error: any) {

      assert.equal(error.response.status, 401)

    }

  })


  test('show transaction', async ({ assert }) => {

    try {

      await api.get('/api/v1/transaction/1')

    } catch (error: any) {

      assert.equal(error.response.status, 401)

    }

  })


  test('refund transaction', async ({ assert }) => {

    try {

      await api.get('/api/v1/transaction/finance/1')

    } catch (error: any) {

      assert.equal(error.response.status, 401)

    }

  })

})