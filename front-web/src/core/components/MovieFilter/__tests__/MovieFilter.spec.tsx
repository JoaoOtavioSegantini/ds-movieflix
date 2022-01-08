import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import selectEvent from 'react-select-event'
import { Router } from 'react-router-dom'
import history from 'src/core/utils/history'
import Movies from 'src/pages/Movie'
import { genresMock, movieMock } from '@mock/moviemock'

const genreServer = setupServer(
  rest.get(`http://localhost:8080/genres`, (req, res, ctx) => {
    return res(ctx.json(genresMock))
  }),
  rest.get(`http://localhost:8080/movies`, (req, res, ctx) => {
    return res(ctx.json(movieMock))
  })
)

beforeAll(() => {
  genreServer.listen()
})
afterEach(() => genreServer.resetHandlers())
afterAll(() => genreServer.close())

test('should React Select render correctly', async () => {
  await render(
    <Router history={history}>
      <Movies />
    </Router>
  )

  const genresInput = screen.getByText('Filtrar por categoria')
  expect(screen.queryByText('Aventura')).toBeNull()
  await waitFor(() => selectEvent.openMenu(genresInput))
  await waitFor(() => expect(screen.getByText('Aventura')).toBeInTheDocument())
  expect(screen.getByText('Terror')).toBeInTheDocument()
  expect(screen.getByText('Ação')).toBeInTheDocument()
  await selectEvent.select(screen.getByText('Ação'), ['Ação'])
  await waitFor(() => expect(screen.getByText('Ação')).toBeInTheDocument())
  expect(screen.queryByText('Terror')).not.toBeInTheDocument()
})
