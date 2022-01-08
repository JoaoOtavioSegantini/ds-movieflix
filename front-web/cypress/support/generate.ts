import { build, fake } from '@jackfranklin/test-data-bot'

export type User = {
  username: string
  email: string
  review: string
}

export const createUserReview = build<User>('User', {
  fields: {
    username: fake(f => f.internet.userName()),
    email: '',
    review: ''
  },
  postBuild: user => ({
    ...user,
    email: `${user.username.toLowerCase()}+e2e@gmail.com`,
    review: `Esta é uma simples análise feita por ${user.username}, o meu email é ${user.username.toLowerCase()}+e2e@gmail.com`
  })
})
