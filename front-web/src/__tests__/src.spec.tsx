import { render, screen } from '@testing-library/react'
import App from 'src/App'
import history from '@utils/history'
import { Router } from 'react-router'
import Routes from 'src/Routes'
import SessionMock from '@mock/sessionMock'

describe('<Sources /> components', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should render <App /> component', () => {
    render(<App />)

    expect(document.querySelector('.Toastify')).toBeInTheDocument()
    expect(screen.getByTestId('App')).toBeInTheDocument()
  })
  it('should render <Routes /> component when user is not authenticated', () => {
    render(
      <Router history={history}>
        <Routes />
      </Router>
    )
    expect(window.location.pathname).toBe('/')

    const home = document.querySelector('.home-container')

    expect(home).toBeInTheDocument()
  })
  it('should render <Routes /> component when user is authenticated', () => {
    new SessionMock().userAll()

    render(
      <Router history={history}>
        <Routes />
      </Router>
    )

    expect(window.location.pathname).toBe('/movies')

    const movies = document.querySelector('.movie-container')

    expect(movies).toBeInTheDocument()
  })
})
