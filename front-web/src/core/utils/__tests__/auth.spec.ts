import {
  isAllowedByRole,
  isTokenValid,
  LoginResponse,
  saveSessionData,
  logout,
  isAuthenticated
} from '../auth'

describe('test auth utils', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  const loginSessionData: LoginResponse = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDE1NzgwNDQsInVzZXJfbmFtZSI6ImFsZXhAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiTUVNQkVSIl0sImp0aSI6IjdmMmJjYzFjLWQyNDgtNDU3ZC04OTNhLWZlNDJkYTM0NzY2MiIsImNsaWVudF9pZCI6ImRzZGVzYWZpb2Jvb3RjYW1wZGV2c3VwZXJpb3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.6zIKeHYjsvp8sXm8il_OkCN62OR43QtUzrztT4H6Pj4',
    expires_in: 311039999,
    scope: 'read write',
    token_type: 'string',
    userName: 'Alex Brown',
    userId: 1
  }
  test('should set auth data in localStorage', () => {
    saveSessionData(loginSessionData)

    expect(window.localStorage.getItem('authData')).toStrictEqual(
      JSON.stringify(loginSessionData)
    )
  })
  test('should return token is valid', () => {
    saveSessionData(loginSessionData)
    const mockFn = jest.fn(() => isTokenValid())

    expect(mockFn()).toBe(true)
  })
  test('should return token is not valid', () => {
    const falseData: LoginResponse = {
      access_token: 'huhiuccv6zIKeHYjsvp8',
      expires_in: 311039999,
      scope: 'read write',
      token_type: 'string',
      userName: 'Alex Brown',
      userId: 1
    }
    saveSessionData(falseData)
    const mockFn = jest.fn(() => isTokenValid())

    expect(mockFn()).toBe(false)
  })
  test('should return true when role is within this function', () => {
    saveSessionData(loginSessionData)

    const mockRole = jest.fn(() => isAllowedByRole(['MEMBER']))

    expect(mockRole()).toBe(true)
  })
  test('should return false when role is not within this function', () => {
    saveSessionData(loginSessionData)

    const mockRole = jest.fn(() => isAllowedByRole(['VISITOR']))
    expect(mockRole()).toBe(false)
  })
  test('should return true when role is empty', () => {
    saveSessionData(loginSessionData)

    const mockRole = jest.fn(() => isAllowedByRole([]))
    expect(mockRole()).toBe(true)
  })
  test('should return true when arguments is empty', () => {
    saveSessionData(loginSessionData)

    const mockRole = jest.fn(() => isAllowedByRole())
    expect(mockRole()).toBe(true)
  })
  test('should remove authData from localhost and return to main menu', () => {
    saveSessionData(loginSessionData)
    const logSpy = jest.fn(() => logout())
    logSpy()
    expect(window.localStorage.getItem('authData')).toBe(null)
  })
  test('should return true when session data is valid', () => {
    saveSessionData(loginSessionData)
    const spyJest = jest.fn(() => isAuthenticated())

    expect(spyJest()).toBe(true)
  })
  test('should return undefined when dont have session data ', () => {
    const spyJest = jest.fn(() => isAuthenticated())

    expect(spyJest()).toBe(undefined)
  })
})
