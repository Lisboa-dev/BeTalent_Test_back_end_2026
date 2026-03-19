import { test } from '@japa/runner'
import { assert } from '@japa/assert'
import axios from 'axios'
import { Console } from 'console'
import { collapseTextChangeRangesAcrossMultipleVersions, isConstructorDeclaration } from 'typescript'




const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
})


function generateUser() {
  return {
    fullName: 'test user',
    email: `test${Date.now()}@test.com`,
    password: 'password',
    passwordConfirmation: 'password'
  }
}
const createFinanceUserDto = {
  fullName: 'finance user',
  email: `test${Date.now()}@test.com`,
  password: 'password',
  passwordConfirmation: 'password', //tamanho 8 digitos
}

const createManagerUserDto = {
  fullName: 'manager user',
  email: `test${Date.now()}@test.com`,
  password: 'password',
  passwordConfirmation: 'password',
}

const userAdmin = {
  email: 'admin@system4.com',
  password: 'admin123',
}

async function createUser(data: { fullName: string; email: string; password: string, passwordConfirmation: string }): Promise<{ email: string; password: string; id: number, fullName:string }> {
  try {
    console.log('in create user', data)
    const response = await api.post('/auth/signup', {fullName: data.fullName, email: data.email, password: data.password, passwordConfirmation: data.passwordConfirmation})
   
    if(response.data.data.user.id){
      
      return {
        id: response.data.data.user.id,
        email: response.data.data.user.email,
        password: data.password,
        fullName: response.data.data.user.fullName
      }
    } else {
      console.log("erro 1 if in create user"+ response.data)
      throw new Error(`Erro ao criar o user: ${response.data.message}`)
    }
  } catch (error: any) {
  
    if (error.response && error.response.status === 422 && error.response.data.errors[0].message === 'email has already been taken') {
      try {
      const loginResponse = await api.post('/auth/login', { email: data.email, password: data.password });
      console.log(loginResponse.data)
      return{
        id: loginResponse.data.data.user.id,
        email: loginResponse.data.data.user.email,
        password: data.password,
        fullName: loginResponse.data.data.user.fullName
      }}
      catch (error: any) {
        throw new Error(`Erro ao obter usuário existente: ${error.message}, data: ${error.data}`)
      }
    }
    console.log("erro")
    console.log(error)
    throw new Error(`Erro ao criar o user: ${error.message}, data: ${error.data}`)
    
  }
}

async function loginUser(userData: { email: string; password: string }): Promise<string> {
  
    try{

      const response = await api.post('/auth/login', userData)
      return response.data.data.token
    } catch (error: any) {
      // O que o Axios enviou (em formato de string)
      console.log('LOGIN USER ENVIADO:', error.config.data) 
      // O que o servidor respondeu (já parseado pelo Axios)
      console.log('LOGIN USER RESPOSTA:', error.response?.data) 
    }
    return ''
}

async function loginAdmin(): Promise<string> {
     try{
          const response = await api.post('/auth/login', {
            email: userAdmin.email,
            password: userAdmin.password,
          })
  return response.data.data.token 
    } catch (error: any) {
      // O que o Axios enviou (em formato de string)
      console.log('LOGIN ADMIN ENVIADO:', error.config.data) 
      // O que o servidor respondeu (já parseado pelo Axios)
      console.log('LOGIN ADMIN RESPOSTA:', error.response?.data) 
      throw new Error(`Errono login do admin: ${error.message}`)
    }
   

}

async function assignRole(userId: number, role: 'finance' | 'manager' | 'admin' | 'user', adminToken: string) {

    try{     
     const url = `/manager/${userId}/promote`
       const response = await api.put(url.trim(), { role }, {
          headers: { Authorization: `Bearer ${adminToken}` },
        })
       
        console.log(response.data)
        return response.data
    } catch (error: any) {
      // O que o Axios enviou (em formato de string)
      console.log('ASSIGN ROLE ENVIADO:', error.config.data) 
      // O que o servidor respondeu (já parseado pelo Axios)
      console.log('ASSIGN ROLE  RESPOSTA:', error.response?.data) 
    }
    return ''
 
}

async function promoteRole(userId: number, role: 'finance' | 'manager' | 'admin' | 'user') {
   const token = await loginAdmin()
   const promot = await assignRole(userId, role, token)
   return promot
}

async function loginFinance(): Promise<string> {
  try{
  const user = await createUser(createFinanceUserDto)
  console.log('user to create user in login finance  ' +user)
  const promoted =await promoteRole(user.id, 'finance')
  const login =  await loginUser({email: promoted.email, password: promoted.password})
   console.log(login)
   return login
  }
  catch (error: any) {
    throw new Error(`Errono login do finance: ${error.message}, data: ${error.data}`)
  }
}
async function loginManager(): Promise<string> {
 try{ const user = await createUser(createFinanceUserDto)
  await promoteRole(user.id, 'manager')
  return await loginUser(user)}
  catch (error: any) {
    throw new Error(`Errono login do Manager: ${error.message}, data: ${error.data}`)
  }
}

test.group('Authentication', (group) => {
  group.each.setup(async () => {
    await createUser(generateUser() );
  });

  test('should register a new user', async ({ assert }) => {
   
  const data = {
    fullName: 'New User',
    email: `newuser-${Date.now()}@example.com`,
    password: 'password',
    passwordConfirmation: 'password',
  }

  try {
    const response = await api.post('/auth/signup', data)
    assert.exists(response.data.data.user.id)
  } catch (error: any) {
   
    throw error
  }
  
  }).timeout(10000)

  test('should login a user', async ({ assert }) => {
    const user = await createUser(generateUser() )
    const response = await api.post('/auth/login', {
      email: user.email,
      password: user.password,
    })
    assert.exists(response.data.data.token)
  })

  test('should logout a user', async ({ assert }) => {
    const user = await createUser(generateUser() )
    const token = await loginUser(user)
   
    const response = await api.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
   
    assert.equal(response.data.message, 'Logged out successfully' )
  })

  test('should not login with invalid credentials', async ({ assert }) => {
    try {
      await api.post('/auth/login', {
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      })
      assert.fail('Deveria ter retornado erro 400')
    } catch (error: any) {
      assert.equal(error.response.status, 400)
      assert.equal(error.response.data.errors[0].message, 'Invalid user credentials')
    }
  }
  ).timeout(10000)
})
test.group('Account Management', (group) => {
  test('should get user profile', async ({ assert }) => {
    const user = await createUser(generateUser())
    const token = await loginUser(user)
    const response = await api.get('/account/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    assert.equal(response.data.data.email, user.email)
  })

  test('should update user profile', async ({ assert }) => {
   try{ const user = await createUser(generateUser() )
    
    const token = await loginUser(user)
    
    const newFullName = 'Updated User Name'
    const response = await api.put('/account', { fullName: newFullName }, {
      headers: { Authorization: `Bearer ${token}` },
    })

    assert.equal(response.status, 200)
    assert.equal(response.data.fullName, newFullName)}catch(e){console.log('update user',  e.response?.data)}
  })

  test('should get user details', async ({ assert }) => {
    const user = await createUser(generateUser() )
    const token = await loginUser(user)
    const response = await api.get('/account', {
      headers: { Authorization: `Bearer ${token}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.email, user.email)
  })

  test('should not get user profile without authentication', async ({ assert }) => {
    try {
      await api.get('/account/profile')
      assert.fail('Deveria ter retornado erro 401')
    } catch (error: any) {
      assert.equal(error.response.status, 401)
    }
  })
})

test.group('Product Management', (group) => {
  let adminToken: string
  let managerToken: string
  let financeToken: string
  let userToken: string
  let productId: number
  let userProductId: number

  group.each.setup(async () => {
    try{
    adminToken = await loginAdmin()
    managerToken = await loginManager()
    financeToken = await loginFinance()
    const user = await createUser(generateUser())
    userToken = await loginUser(user)
    const productResponse = await api.post('/product', {
      name: `Test Product ${Date.now()}`,
      description: 'Description for product',
      stock: 10,
      price: 99.99,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    console.log('productResponse', productResponse.data.id)
    productId = productResponse.data.id
    
    const userProductResponse = await api.post('/product', {
      name: `User Product ${Date.now()}`,
      description: 'Description for user product',
      stock: 5,
      price: 49.99,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    console.log('userProductResponse', userProductResponse.data.id)
    userProductId = userProductResponse.data.id
  }catch(e){console.log('erro set', e)}
  })

  test('should list products (no auth)', async ({ assert }) => {
    const response = await api.get('/product')
    assert.equal(response.status, 200)
    assert.isArray(response.data.data)
  })

  test('admin should create a product', async ({ assert }) => {
   
   try{ const response = await api.post('/product', {
      name: `Admin Product ${Date.now()}`,
      description: 'Description for admin product',
      stock: 10,
      price: 99.99,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 201)
    assert.exists(response.data.id)}catch(e){console.log(e.data)}
  })

  test('manager should create a product', async ({ assert }) => {
    const response = await api.post('/product', {
      name: `Manager Product ${Date.now()}`,
      description: 'Description for manager product',
      stock: 5,
      price: 49.99,
    }, {
      headers: { Authorization: `Bearer ${managerToken}` },
    })
    assert.equal(response.status, 201)
    assert.exists(response.data.id)
  })

  test('finance should create a product', async ({ assert }) => {
    const response = await api.post('/product', {
      name: `Finance Product ${Date.now()}`,
      description: 'Description for finance product',
      stock: 20,
      price: 199.99,
    }, {
      headers: { Authorization: `Bearer ${financeToken}` },
    })
    assert.equal(response.status, 201)
    assert.exists(response.data.id)
  })

  test('user should not create a product', async ({ assert }) => {
    try {
      await api.post('/product', {
        name: `User Product Attempt ${Date.now()}`,
        description: 'Description for user product attempt',
        stock: 1,
        price: 10.00,
      }, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      assert.fail('Deveria ter retornado erro 403')
    } catch (error: any) {
      assert.equal(error.response.status, 403)
    }
  })

  test('should get a product by ID (no auth)', async ({ assert }) => {
    const response = await api.get(`/product/${productId}`)
    assert.equal(response.status, 200)
    assert.equal(response.data.id, productId)
  })

  test('admin should update a product', async ({ assert }) => {
    const updatedName = `Updated Product Name Admin ${Date.now()}`
    const response = await api.put(`/product/${productId}`, { name: updatedName }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.name, updatedName)
  })

  test('manager should update a product', async ({ assert }) => {
    const updatedName = `Updated Product Name Manager ${Date.now()}`
    const response = await api.put(`/product/${productId}`, { name: updatedName }, {
      headers: { Authorization: `Bearer ${managerToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.name, updatedName)
  })

  test('finance should update a product', async ({ assert }) => {
    const updatedName = `Updated Product Name Finance ${Date.now()}`
    const response = await api.put(`/product/${productId}`, { name: updatedName }, {
      headers: { Authorization: `Bearer ${financeToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.name, updatedName)
  })

  test('should get a product by name (no auth)', async ({ assert }) => {
    const dynamicProductName = `Updated Product Name Admin ${Date.now()}`;
    const productToSearchResponse = await api.post('/product', {
      name: `Searchable Product ${Date.now()}`,
      description: 'Description for searchable product',
      stock: 1,
      price: 1.00,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const productToSearchId = productToSearchresponse.data.id;
    await api.put(`/product/${productToSearchId}`, { name: dynamicProductName }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const response = await api.get(`/product/name/${encodeURIComponent(dynamicProductName)}`)
    assert.equal(response.status, 200)
    assert.equal(response.data.name, dynamicProductName)
  })

  test('admin should delete a product', async ({ assert }) => {
    const productToDeleteResponse = await api.post('/product', {
      name: `Product to Delete ${Date.now()}`,
      description: 'Description for product to delete',
      stock: 1,
      price: 1.00,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const productToDeleteId = productToDeleteresponse.data.id

    const response = await api.delete(`/product/${productToDeleteId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 204)
  })

  test('should list products by user (auth required)', async ({ assert }) => {
    const user = await createUser(generateUser() )
    const token = await loginUser(user)
    const response = await api.get(`/product/myProducts/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
  })

  test('should show product detail by user (auth required)', async ({ assert }) => {
    const user = await createUser(generateUser() )
    const token = await loginUser(user)
    const productResponse = await api.post('/product', {
      name: `User Specific Product ${Date.now()}`,
      description: 'Product for user detail test',
      stock: 1,
      price: 10.00,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const userProductId = productresponse.data.id

    const response = await api.get(`/product/myProducts/detail/${user.id}?productId=${userProductId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.id, userProductId)
  })
})

test.group('Privileges Management', (group) => {
  let adminToken: string
  let managerToken: string
  let testUserId: number

  group.each.setup(async () => {
    adminToken = await loginAdmin()
    const user = await createUser({ fullName: 'Privilege Test User', email: `privilege-${Date.now()}@test.com`, password: 'password', passwordConfirmation: 'password' })
    testUserId = user.id
    managerToken = await loginManager()
  })

  test('admin should update user privilege (PUT /manager/:id)', async ({ assert }) => {
    const response = await api.put(`/manager/${testUserId}`, { role: 'manager' }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.role, 'manager')
  })

  test('admin should list all users (GET /manager)', async ({ assert }) => {
    const response = await api.get('/manager', {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
    assert.isAtLeast(response.data.length, 1)
  })

  test('manager should list all users (GET /manager)', async ({ assert }) => {
    const response = await api.get('/manager', {
      headers: { Authorization: `Bearer ${managerToken}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
    assert.isAtLeast(response.data.length, 1)
  })

  test('admin should get user by ID (GET /manager/:id)', async ({ assert }) => {
    const response = await api.get(`/manager/${testUserId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.id, testUserId)
  })

  test('admin should delete a user (DELETE /manager/:id)', async ({ assert }) => {
    const userToDelete = await createUser({ fullName: 'User To Delete', email: `delete-${Date.now()}@test.com`, password: 'password', passwordConfirmation: 'password' })
    const response = await api.delete(`/manager/${userToDelete.id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 204)
  })
})

test.group('Gateway Management', (group) => {
  let adminToken: string
  let gatewayId: string

  group.each.setup(async () => {
    adminToken = await loginAdmin()
  })

  test('admin should create a gateway (POST /gateway)', async ({ assert }) => {
    const response = await api.post('/gateway', {
      name: `Test Gateway ${Date.now()}`,
      priority: 1,
      isActive: true,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 201)
    assert.exists(response.data.id)
    gatewayId = response.data.id
  })

  test('admin should list gateways (GET /gateway)', async ({ assert }) => {
    const response = await api.get('/gateway', {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
    assert.isAtLeast(response.data.length, 1)
  })

  test('admin should update a gateway (PUT /gateway/:id)', async ({ assert }) => {
    const updatedName = `Updated Gateway ${Date.now()}`
    const response = await api.put(`/gateway/${gatewayId}`, { name: updatedName, priority: 2 }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.name, updatedName)
  })

  test('admin should delete a gateway (DELETE /gateway/:id)', async ({ assert }) => {
    const gatewayToDeleteResponse = await api.post('/gateway', {
      name: `Gateway To Delete ${Date.now()}`,
      priority: 99,
      isActive: false,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    const gatewayToDeleteId = gatewayToDeleteresponse.data.id

    const response = await api.delete(`/gateway/${gatewayToDeleteId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 204)
  })
})

test.group('Transaction Management', (group) => {
  let adminToken: string
  let userToken: string
  let financeToken: string
  let userId: number
  let productId: number

  group.each.setup(async () => {
    adminToken = await loginAdmin()
    const user = await createUser(generateUser() )
    userToken = await loginUser(user)
    userId = user.id
    financeToken = await loginFinance()

    const productResponse = await api.post('/product', {
      name: 'Transaction Product',
      description: 'Product for transaction tests',
      stock: 10,
      price: 50.00,
    }, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    productId = productresponse.data.id
  })

  test('user should create a transaction (POST /transaction)', async ({ assert }) => {
    const idempotencyKey = `trans-key-${Date.now()}`
    const response = await api.post('/transaction', {
      payment: {
        name: 'Test Client',
        email: 'client@example.com',
        cardNumber: '4567890456',
        cvv: '',
        amount: 50.00,
      },
      products: [
        { id: productId, quantity: 1 },
      ],
      clientId: userId,
      idempotency_key: idempotencyKey,
    }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    assert.equal(response.status, 200)
    assert.exists(response.data.id)
    assert.equal(response.data.status, 'approved')
  })

  test('admin should list all transactions (GET /transaction)', async ({ assert }) => {
    const response = await api.get('/transaction', {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
    assert.isAtLeast(response.data.length, 1)
  })

  test('finance should list all transactions (GET /transaction)', async ({ assert }) => {
    const response = await api.get('/transaction', {
      headers: { Authorization: `Bearer ${financeToken}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
    assert.isAtLeast(response.data.length, 1)
  })

  test('admin should get transaction by ID (GET /transaction/:id)', async ({ assert }) => {
    const idempotencyKey = `trans-id-key-${Date.now()}`
    const transactionResponse = await api.post('/transaction', {
      payment: {
        name: 'Test Client ID',
        email: 'clientid@example.com',
        cardNumber: '4567890456',
        cvv: '',
        amount: 50.00,
      },
      products: [
        { id: productId, quantity: 1 },
      ],
      clientId: userId,
      idempotency_key: idempotencyKey,
    }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    const transactionId = transactionResponse.data.id

    const response = await api.get(`/transaction/${transactionId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.id, transactionId)
  })

  test('finance should refund a transaction (GET /transaction/finance/:id)', async ({ assert }) => {
    const idempotencyKey = `refund-key-${Date.now()}`
    const transactionResponse = await api.post('/transaction', {
      payment: {
        name: 'Test Client Refund',
        email: 'clientrefund@example.com',
        cardNumber: '4567890456',
        cvv: '',
        amount: 50.00,
      },
      products: [
        { id: productId, quantity: 1 },
      ],
      clientId: userId,
      idempotency_key: idempotencyKey,
    }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    const transactionId = transactionResponse.data.id

    const response = await api.get(`/transaction/finance/${transactionId}`, {
      headers: { Authorization: `Bearer ${financeToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.status, 'refunded')
  })

  test('user should list their own transactions (GET /transaction/myTransactions/:id)', async ({ assert }) => {
    const idempotencyKey = `user-list-key-${Date.now()}`
    await api.post('/transaction', {
      payment: {
        name: 'User List Client',
        email: 'userlist@example.com',
        cardNumber: '4567890456',
        cvv: '',
        amount: 7.00,
      },
      products: [
        { id: productId, quantity: 1 },
      ],
      clientId: userId,
      idempotency_key: idempotencyKey,
    }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })

    const response = await api.get(`/transaction/myTransactions/${userId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    assert.equal(response.status, 200)
    assert.isArray(response.data)
    assert.isAtLeast(response.data.length, 1)
  })

  test('user should show detail of their transaction (GET /transaction/myTransactions/detail/:id)', async ({ assert }) => {
    const idempotencyKey = `user-detail-key-${Date.now()}`
    const transactionResponse = await api.post('/transaction', {
      payment: {
        name: 'User Detail Client',
        email: 'userdetail@example.com',
        cardNumber: '4567890456',
        cvv: '',
        amount: 7.00,
      },
      products: [
        { id: productId, quantity: 1 },
      ],
      clientId: userId,
      idempotency_key: idempotencyKey,
    }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    const userTransactionId = transactionResponse.data.id

    const response = await api.get(`/transaction/myTransactions/detail/${userId}?transactionId=${userTransactionId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    assert.equal(response.status, 200)
    assert.equal(response.data.id, userTransactionId)
  })
})

test('GET / should return hello world', async ({ assert }) => {
  const response = await axios.get('http://localhost:3333/')
  assert.equal(response.status, 200)
  assert.deepEqual(response.data, { hello: 'world' })
})