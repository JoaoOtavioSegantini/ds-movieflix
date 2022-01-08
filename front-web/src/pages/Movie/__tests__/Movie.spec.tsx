import { render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import Movie from '..'
import { genresMock, movieMock } from '@mock/moviemock'
import { Router, Route } from 'react-router-dom'
import history from 'src/core/utils/history'
import userEvent from '@testing-library/user-event'
import SessionMock from '@mock/sessionMock'

const server = setupServer(
  rest.get(`http://localhost:8080/movies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(movieMock))
  }),
  rest.get(`http://localhost:8080/genres`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(genresMock))
  })
)

beforeAll(() => {
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<Movies />', () => {
  test('should render <Movie /> component', async () => {
    new SessionMock().userValidMember()
    history.push('/movies')
    await waitFor(() =>
      render(
        <Router history={history}>
          <Route path="/movies" exact>
            <Movie />
          </Route>
        </Router>
      )
    )

    expect(screen.getAllByTitle('Loading...')).toHaveLength(4)

    await waitFor(() => expect(screen.getAllByText('2008')).toHaveLength(2))

    expect(
      screen.getByText('Através de um misterioso portal')
    ).toBeInTheDocument()

    expect(screen.getByText('Anônimo')).toBeInTheDocument()

    expect(
      screen.getByText('No passado pré-histórico, DLeh é um caçador')
    ).toBeInTheDocument()

    expect(screen.getByText('007 - O Amanhã Nunca Morre')).toBeInTheDocument()
    await waitFor(() => userEvent.click(screen.getByText('2')))
    await waitFor(() =>
      expect(
        screen.getByLabelText('Page 2 is your current page')
      ).toBeInTheDocument()
    )
  })
})
