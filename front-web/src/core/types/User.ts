import { Authority } from '@utils/auth'

export type User = {
  id: number
  name: string
  email: string
  roles: Role[]
}

export type Role = {
  id: number
  authority: Authority
}

export type UserReponse = {
  content: User[]
  totalPages: number
}
