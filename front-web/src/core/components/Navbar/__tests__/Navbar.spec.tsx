import { render, screen } from '@testing-library/react'
import Navbar from '..'
import history from 'src/core/utils/history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SessionMock from '@mock/sessionMock'

describe('<Navbar />', () => {
  test('should render <Navbar /> component', () => {
    const { container } = render(
      <Router history={history}>
        <Navbar />
      </Router>
    )
    const title = screen.getByText('MovieFlix')
    const button = screen.queryByText('SAIR')

    expect(title).toBeInTheDocument()
    expect(title).toHaveStyle({ backgroundColor: 'var(--primary)' })
    expect(button).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
  test('should rende button when user is logged', () => {
    new SessionMock().userValidMember()

    const { container } = render(
      <Router history={history}>
        <Navbar />
      </Router>
    )

    const user = screen.getByTitle('alex@gmail.com')
    const button = screen.getByText('SAIR')

    expect(button).toBeInTheDocument()
    expect(user).toBeInTheDocument()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <nav
        class="row bg-primary main-nav"
      >
        <div
          class="navbar"
        >
          <a
            class="logo-text col-3"
            href="/"
          >
            MovieFlix
          </a>
          <div
            class="col-9 auth-button btn btn-primary"
            title="alex@gmail.com"
          >
            SAIR
          </div>
        </div>
      </nav>
    `)

    userEvent.click(button)
    // expect(handleLogout.mock.calls.length).toEqual(1)
    expect(button.onclick?.call.length).toEqual(1)
  })
})
