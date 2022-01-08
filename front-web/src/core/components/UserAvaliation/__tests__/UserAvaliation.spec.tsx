import { render, screen } from '@testing-library/react'
import { Review } from '@type/Review'
import UserAvaliation from '..'

const props = {
  text: 'a simple review',
  user: {
    name: 'João Otávio'
  }
} as Review

test('should render <UserAvaliation /> component', () => {
  render(<UserAvaliation review={props} />)

  const textReview = screen.getByText('a simple review')
  const user = screen.getByText('João Otávio')
  const star = screen.getByAltText('estrela amarela')

  expect(textReview).toBeInTheDocument()
  expect(textReview).toHaveStyle({ color: 'var(--grey)' })
  expect(user).toBeInTheDocument()
  expect(user).toHaveStyle({ color: 'var(--pure-white)' })
  expect(star).toBeInTheDocument()
})
