import { render, screen } from '@testing-library/react'
import MovieCardDetailsLoader from '../MovieCardDetailsLoader'
import MovieCardLoader from '../MovieCardLoader'
import ReviewsLoader from '../ReviewsLoader'
import SaveAvaliationLoader from '../SaveAvaliationLoader'

test('should render loaders component', () => {
  render(
    <>
      <MovieCardDetailsLoader /> <ReviewsLoader />
      <SaveAvaliationLoader />
    </>
  )
  const loaderNum = screen.getAllByTitle('Loading...')
  expect(loaderNum).toHaveLength(3)
})

test('should render all <MovieCard /> loaders', () => {
  render(<MovieCardLoader />)

  const loaderNum = screen.getAllByTitle('Loading...')

  expect(loaderNum).toHaveLength(4)
})
