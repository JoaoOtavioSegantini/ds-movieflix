import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { LoginResponse } from '../auth'
import { makeLogin } from '../request'

type LoginData = {
  username: string
  password: string
}

const loginSessionData: LoginResponse = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDE1NzgwNDQsInVzZXJfbmFtZSI6ImFsZXhAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiTUVNQkVSIl0sImp0aSI6IjdmMmJjYzFjLWQyNDgtNDU3ZC04OTNhLWZlNDJkYTM0NzY2MiIsImNsaWVudF9pZCI6ImRzZGVzYWZpb2Jvb3RjYW1wZGV2c3VwZXJpb3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.6zIKeHYjsvp8sXm8il_OkCN62OR43QtUzrztT4H6Pj4',
  expires_in: 311039999,
  scope: 'read write',
  token_type: 'string',
  userName: 'Alex Brown',
  userId: 1
}

const error = {
  error: 'invalid_grant',
  error_description: 'Bad credentials'
}

const responseServer = setupServer(
  rest.post(`http://localhost:8080/oauth/token`, (req, res, ctx) => {
    const data = req.body
    const validUser = 'valid%40gmail.com'
    const validPassword = 'isValidPass'
    if (
      data ===
      `username=${validUser}&password=${validPassword}&grant_type=password`
    ) {
      return res(ctx.json(loginSessionData))
    }
    return res(ctx.json(error))
  })
)

beforeAll(() => responseServer.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => responseServer.resetHandlers())
afterAll(() => responseServer.close())

describe('<Login />', () => {
  test('should return error if all credentials is wrongs', async () => {
    const data: LoginData = {
      username: 'true@gmail.com',
      password: 'ccvvv'
    }

    const value = await makeLogin(data)
    await expect(value.data).toStrictEqual(error)
  })
  test('should return error if one credentials is wrong', async () => {
    const data: LoginData = {
      username: 'valid@gmail.com',
      password: 'ccvvv'
    }

    const value = await makeLogin(data)
    await expect(value.data).toStrictEqual(error)
  })
  test('should login data if all credentials is right', async () => {
    const data: LoginData = {
      username: 'valid@gmail.com',
      password: 'isValidPass'
    }

    const value = await makeLogin(data)

    await expect(value.data).toStrictEqual(loginSessionData)
  })
})
