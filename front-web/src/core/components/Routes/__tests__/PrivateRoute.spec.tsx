import { render, screen } from '@testing-library/react'
import history from 'src/core/utils/history'
import { Router } from 'react-router-dom'
import SessionMock from '@mock/sessionMock'
import PrivateRoute from '../PrivateRoute'

describe('<PrivateRoute />', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('should return to main page when user is not authenticated', () => {
    history.push('/otherpath')
    render(
      <Router history={history}>
        <PrivateRoute path="/otherpath">
          <h1 data-testid="route">Test</h1>
        </PrivateRoute>
      </Router>
    )
    expect(window.location.pathname).toBe('/')
    expect(screen.queryByTestId('route')).not.toBeInTheDocument()
  })
  test('should return to route when user is authenticated', () => {
    new SessionMock().userAll()

    history.push('/otherpath')
    render(
      <Router history={history}>
        <PrivateRoute path="/otherpath">
          <h1 data-testid="route">Test</h1>
        </PrivateRoute>
      </Router>
    )
    expect(window.location.pathname).toBe('/otherpath')
    expect(screen.queryByTestId('route')).toBeInTheDocument()
  })
  test('should return to /movies when user is not authorized', () => {
    new SessionMock().userValidVisitor()
    history.push('/otherpath')
    render(
      <Router history={history}>
        <PrivateRoute path="/otherpath" allowedRoutes={['MEMBER']}>
          <h1 data-testid="route">Test</h1>
        </PrivateRoute>
      </Router>
    )
    expect(window.location.pathname).toBe('/movies')
    expect(screen.queryByTestId('route')).not.toBeInTheDocument()
  })
})
