import { render, screen, waitFor } from '@testing-library/react'
import { Route, Router, useParams, Switch } from 'react-router-dom'
import history from 'src/core/utils/history'
import MovieDetails from '..'
import { mock } from '@mock/detailsMock'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import SessionMock from '@mock/sessionMock'
import PrivateRoute from 'src/core/components/Routes/PrivateRoute'
import { act } from 'react-dom/test-utils'
import { ToastContainer } from 'react-toastify'
import Home from 'src/pages/Home'
import * as authMock from 'src/core/utils/auth'

const movieId = '1'

let success = true
let revSuccess = true

const review = [
  {
    id: 2,
    text: 'Achei o filme ótimo!!!',
    movieId: 1,
    user: {
      id: 1,
      email: 'joao@gmail.com',
      name: 'Joao',
      roles: [
        {
          id: 2,
          authority: 'MEMBER'
        }
      ]
    }
  }
]

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

const server = setupServer(
  rest.get(`http://localhost:8080/movies/${movieId}`, (req, res, ctx) => {
    return !success
      ? res(ctx.status(500))
      : res(ctx.json(mock), ctx.status(200))
  }),
  rest.post('http://localhost:8080/reviews', (req, res, ctx) => {
    return !revSuccess
      ? res(ctx.status(404, 'simple text error message'))
      : res(ctx.status(200), ctx.json(review))
  })
)
beforeEach(() => {
  jest.clearAllMocks(),
    (useParams as jest.Mock).mockReturnValue({
      movieId: '1'
    })
})
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' })
})
afterEach(() => {
  jest.clearAllMocks(), window.localStorage.clear(), server.resetHandlers()
})
afterAll(() => server.close())

describe('<MovieDetails />', () => {
  test('should render <MovieDetails /> component', async () => {
    history.push('/movies/1')
    render(
      <Router history={history}>
        <Route path="/movies/1">
          <MovieDetails />
        </Route>
      </Router>
    )

    const subTitle = await waitFor(() =>
      screen.getByText(
        'O vilão Loki reempreende seu papel como o Deus do Mal....'
      )
    )
    const year = screen.getByText(2021)
    const imgUrl = screen.getAllByRole('img')[0]
    const overview = screen.getByText(
      'Loki é uma série estadunidense criada por Michael Waldron para o Disney+, baseada no personagem de mesmo nome da Marvel Comics. É ambientada no Universo Cinematográfico Marvel (UCM), compartilhando continuidade com os filmes da franquia. A série se passa após os eventos do filme Vingadores: Ultimato (2019), no qual uma versão alternativa de Loki cria uma nova linha do tempo. Loki é produzida pelo Marvel Studios, com Waldron atuando como roteirista principal e Kate Herron dirigindo a primeira temporada.Tom Hiddleston repete seu papel como Loki da série de filmes, com Gugu Mbatha-Raw, Wunmi Mosaku, Eugene Cordero, Tara Strong, Owen Wilson, Sophia Di Martino, Sasha Lane, Jack Veal, DeObia Oparei, Richard E. Grant e Jonathan Majors também estrelando. Em setembro de 2018, o Marvel Studios estava desenvolvendo uma série de séries limitadas para o Disney+, centradas em personagens coadjuvantes dos filmes do UCM.Depois de roubar o Tesseract durante os eventos de Vingadores: Ultimato, uma versão alternativa de Loki é trazida para a misteriosa Autoridade de Variância Temporal (AVT), uma organização burocrática que existe fora do tempo e do espaço, e monitora a linha do tempo. Eles dão a Loki uma escolha: ser apagado da existência por ser uma "variante do tempo" ou ajudar a consertar a linha do tempo e impedir uma ameaça maior. Loki acaba preso em seu próprio thriller policial, viajando no tempo e alterando a história da humanidade.'
    )
    const userRev = screen.getByText('Alex Brown')
    const userText = screen.getByText(
      'Achei o filme ótimo, meus parabéns para o diretor!!!'
    )

    expect(history.location.pathname).toBe('/movies/1')
    expect(year).toBeInTheDocument()
    expect(year).toHaveStyle({ color: 'var(--primary-color)' })
    expect(screen.getByTestId('movie-title')).toBeInTheDocument()
    expect(screen.getByTestId('movie-title')).toHaveStyle({
      color: 'var(--pure-white)'
    })
    expect(imgUrl).toBeInTheDocument()
    expect(imgUrl).toHaveAttribute(
      'src',
      'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/5fRAAO13URmteku8mb39V9YPJBb.jpg'
    )
    expect(subTitle).toBeInTheDocument()
    expect(overview).toBeInTheDocument()
    expect(userRev).toBeInTheDocument()
    expect(userText).toBeInTheDocument()
  })
  test('should render modal when user type empty review', async () => {
    new SessionMock().userAll()
    history.push('/movies/1')
    render(
      <Router history={history}>
        <Route path="/movies/1">
          <MovieDetails />
        </Route>
      </Router>
    )

    expect(screen.getAllByTitle('Loading...')).toHaveLength(3)

    await waitFor(async () => {
      const userRev = screen.getByTestId('avaliation-save-input-main')
      await userEvent.type(userRev, '')
    })
    const saveRev = screen.getByTestId('review-onsave')

    userEvent.click(saveRev)

    const buttonCloseModal = screen.getByRole('button')

    expect(document.querySelector('.overlay')).toBeInTheDocument()
    userEvent.click(buttonCloseModal)
    expect(buttonCloseModal.onclick?.call.length).toBe(1)
    expect(document.querySelector('.overlay')).not.toBeInTheDocument()
  })
  test('should render view more information label', async () => {
    history.push('/movies/1')
    render(
      <Router history={history}>
        <Route path="/movies/1">
          <MovieDetails />
        </Route>
      </Router>
    )
    await waitFor(() => {
      expect(screen.getByText('Ver tudo')).toBeInTheDocument()
      expect(screen.queryByText('Resumir')).not.toBeInTheDocument()
    })
    expect(document.querySelector('p')).not.toHaveClass('truncated')
    userEvent.click(screen.getByText('Ver tudo'))

    expect(screen.getByText('Resumir')).toBeInTheDocument()
    expect(screen.queryByText('Ver tudo')).not.toBeInTheDocument()
  })
  test(`should don't render disable save review when user is a member`, async () => {
    new SessionMock().userAll()
    history.push('/movies/1')
    const { container } = render(
      <Router history={history}>
        <PrivateRoute allowedRoutes={['MEMBER']} path="/movies/1">
          <MovieDetails />
        </PrivateRoute>
      </Router>
    )

    await waitFor(async () => {
      expect(
        screen.getByText(
          /O vilão Loki reempreende seu papel como o Deus do Mal..../i
        )
      ).toBeInTheDocument()
      await expect(
        screen.queryAllByTitle(/Somente membros podem salvar uma avaliação/i)
      ).toHaveLength(0)
    })
    await waitFor(() => expect(container.firstChild).toMatchSnapshot())
  })
  test('should render disable save review when use is not a member', async () => {
    history.push('/movies/1')
    const { container } = render(
      <Router history={history}>
        <Route path="/movies/1">
          <MovieDetails />
        </Route>
      </Router>
    )
    await waitFor(() => {
      expect(
        screen.getAllByTitle(/Somente membros podem salvar uma avaliação/i)
      ).toHaveLength(2)

      expect(screen.getByTestId('review-onsave')).toHaveClass(
        'invalid-save-review'
      )
    })
    expect(screen.getByTestId('avaliation-save-input-main')).toHaveAttribute(
      'disabled'
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('should send text review when user is a member', async () => {
    new SessionMock().userAll()

    history.push('/movies/1')
    render(
      <Router history={history}>
        <Route path="/movies/1">
          <ToastContainer />
          <MovieDetails />
        </Route>
      </Router>
    )
    await waitFor(() => {
      expect(
        screen.getByText(
          /O vilão Loki reempreende seu papel como o Deus do Mal..../i
        )
      ).toBeInTheDocument()
    })
    act(() => {
      const review = 'Achei o filme ótimo!!!'
      userEvent.type(
        screen.getByPlaceholderText(/deixe sua avaliação aqui/i),
        review
      )
      userEvent.click(screen.getByText(/salvar avaliação/i))
    })

    await waitFor(() =>
      expect(
        screen.getByText('Avaliação do filme Loki enviada com sucesso!')
      ).toBeInTheDocument()
    )
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    expect(screen.getByText('Achei o filme ótimo!!!')).toBeInTheDocument()
    expect(screen.getByText('Joao')).toBeInTheDocument()
  })
  test('should show text error when API call fail', async () => {
    success = false
    history.push('/movies/1')
    render(
      <Router history={history}>
        <Route path="/movies/1">
          <ToastContainer />
          <MovieDetails />
        </Route>
      </Router>
    )
    await waitFor(() => {
      expect(
        screen.getByText('Request failed with status code 500')
      ).toBeInTheDocument()
    })

    act(() => {
      const review = 'Achei o filme ótimo!!!'
      userEvent.type(
        screen.getByPlaceholderText(/deixe sua avaliação aqui/i),
        review
      )
      userEvent.click(screen.getByText(/salvar avaliação/i))
    })
  })
  test('should show text error when reviews API call fail', async () => {
    success = true
    revSuccess = false
    new SessionMock().userAll()
    history.push('/movies/1')
    render(
      <Router history={history}>
        <Route path="/movies/1">
          <ToastContainer />
          <MovieDetails />
        </Route>
      </Router>
    )
    await waitFor(() => {
      expect(
        screen.getByText(
          /O vilão Loki reempreende seu papel como o Deus do Mal..../i
        )
      ).toBeInTheDocument()
    })

    act(() => {
      const review = 'Achei o filme ótimo!!!'
      userEvent.type(
        screen.getByPlaceholderText(/deixe sua avaliação aqui/i),
        review
      )
      userEvent.click(screen.getByText(/salvar avaliação/i))
    })

    await waitFor(() => {
      expect(
        screen.getByText('Request failed with status code 404')
      ).toBeInTheDocument()
    })
  })
  test('should redirect to home when user is unauthorized', async () => {
    jest.spyOn(authMock, 'logout')
    new SessionMock().userAll()

    const testErrorMessage = 'THIS IS A TEST FAILURE'

    server.use(
      rest.post(`http://localhost:8080/reviews`, async (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ message: testErrorMessage }))
      })
    )

    await waitFor(() =>
      render(
        <Router history={history}>
          <Switch>
            <Route path="/movies/1">
              <MovieDetails />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      )
    )
    await waitFor(() => {
      expect(
        screen.getByText(
          /O vilão Loki reempreende seu papel como o Deus do Mal..../i
        )
      ).toBeInTheDocument()
    })

    act(() => {
      history.push('/movies/1')
      expect(window.location.pathname).toBe('/movies/1')
      const review = 'Achei o filme ótimo!!!'
      userEvent.type(screen.getByTestId('avaliation-save-input-main'), review)
      userEvent.click(screen.getByText(/salvar avaliação/i))
    })
    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(authMock.logout).toHaveBeenCalled()
    })
  })
})
