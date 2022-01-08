import { render, screen } from '@testing-library/react'
import Card from '..'
import { Movie } from '@type/Movie'

const Props: Movie = {
  id: 1,
  title: 'Movie title',
  subTitle: 'movie subtitle',
  year: 2021,
  imgUrl: 'https://movie',
  synopsis: 'a simple synopsis',
  reviews: [
    {
      id: 1,
      text: 'a simple review',
      user: {
        id: 1,
        name: 'Joao',
        email: 'joao@gmail.com',
        roles: [{ id: 1, authority: 'MEMBER' }]
      }
    }
  ],
  genreId: 1
}

test('should render <Card /> component', () => {
  render(<Card movie={Props} />)

  const titleElement = screen.getByText(Props.title)
  const subTitleElement = screen.getByText(Props.subTitle)
  const yearElement = screen.getByText(Props.year)
  const imgElement = screen.getByRole('img')

  expect(titleElement).toBeInTheDocument()
  expect(subTitleElement).toBeInTheDocument()
  expect(yearElement).toBeInTheDocument()
  expect(imgElement).toBeInTheDocument()
  expect(imgElement).toHaveAttribute('src', Props.imgUrl)
})
