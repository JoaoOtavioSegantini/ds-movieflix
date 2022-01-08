import { render, screen, waitFor } from '@testing-library/react'
import Home from '..'
import history from 'src/core/utils/history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { LoginResponse } from 'src/core/utils/auth'
import { ToastContainer } from 'react-toastify'
import { act } from 'react-dom/test-utils'

const loginSessionData: LoginResponse = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDE1NzgwNDQsInVzZXJfbmFtZSI6ImFsZXhAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiTUVNQkVSIl0sImp0aSI6IjdmMmJjYzFjLWQyNDgtNDU3ZC04OTNhLWZlNDJkYTM0NzY2MiIsImNsaWVudF9pZCI6ImRzZGVzYWZpb2Jvb3RjYW1wZGV2c3VwZXJpb3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.6zIKeHYjsvp8sXm8il_OkCN62OR43QtUzrztT4H6Pj4',
  expires_in: 311039999,
  scope: 'read write',
  token_type: 'string',
  userName: 'Alex Brown',
  userId: 1
}

describe('<Home />', () => {
  let success = false
  const server = setupServer(
    rest.post(`http://localhost:8080/oauth/token`, (req, res, ctx) => {
      return !success
        ? res(ctx.status(404, 'Usuário não encontrado'))
        : res(ctx.status(200), ctx.json(loginSessionData))
    })
  )
  beforeAll(() => {
    window.localStorage.clear()
    server.listen({ onUnhandledRequest: 'error' })
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  test('should render <Home /> component', async () => {
    render(
      <Router history={history}>
        <Home />
      </Router>
    )

    expect(screen.getByText(/Avalie Filmes/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Diga o que você achou do seu filme favorito/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/logar/i)).toBeInTheDocument()
    expect(screen.getByTestId('main-image')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getByTestId('arrowIcon')).toBeInTheDocument()
    expect(screen.getByTestId('arrowIcon')).toHaveStyle({
      color: 'var(--pure-white)'
    })
    expect(screen.getByTestId('arrowIcon')).toHaveStyle({
      backgroundColor: 'var(--buttons-side-bg)'
    })
    userEvent.type(screen.getByPlaceholderText(/email/i), 'joao@gmail.com')
    userEvent.type(screen.getByPlaceholderText(/senha/i), 'joao@gmail.com')
    userEvent.click(screen.getByTestId(/visibilityoff/i))
    expect(screen.queryByTestId(/visibilityoff/i)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/visibilityon/i)).toBeInTheDocument()

    userEvent.click(screen.getByText(/logar/i))

    await waitFor(() => expect(screen.getByTestId('alert')).toBeInTheDocument())
    const close = screen.getByText(/x/i)
    userEvent.click(close)
    expect(close.onclick?.call.length).toBe(1)
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument()
  })
  test('should make login with success', async () => {
    success = true
    jest.useFakeTimers()

    render(
      <Router history={history}>
        <ToastContainer />
        <Home />
      </Router>
    )
    userEvent.type(screen.getByPlaceholderText(/email/i), 'joao@gmail.com')
    userEvent.type(screen.getByPlaceholderText(/senha/i), 'joao@gmail.com')

    userEvent.click(screen.getByText(/logar/i))

    await waitFor(() => expect(window.location.pathname).toBe('/movies'))
    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(
      screen.getByText('Bem vindo de volta Alex Brown!')
    ).toBeInTheDocument()
  })
})
