import jwtDecode from 'jwt-decode'

import history from './history'

export type LoginResponse = {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  userName: string
  userId: number
}

export type Authority = 'VISITOR' | 'MEMBER' | 'ROLE_ADMIN'

export type AccessToken = {
  exp: number
  user_name: string
  authorities: Authority[]
}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse))
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}'
  const dataParse = JSON.parse(sessionData)

  return dataParse as LoginResponse
}

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData()
  try {
    const tokenDecoded = jwtDecode(sessionData.access_token)
    return tokenDecoded as AccessToken
  } catch (err) {
    return {} as AccessToken
  }
}

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded()

  return Date.now() <= exp * 1000
}

export const isAuthenticated = () => {
  const sessionData = getSessionData()

  return sessionData.access_token && isTokenValid()
}

export const isAllowedByRole = (role: Authority[] = []) => {
  if (role.length === 0) return true
  const { authorities } = getAccessTokenDecoded()
  return role.some((el) => authorities?.includes(el))
}

export const logout = () => {
  localStorage.removeItem('authData')
  history.replace('/')
}
