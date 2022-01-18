import './styles.scss'

import {
  getAccessTokenDecoded,
  isAllowedByRole,
  isTokenValid,
  logout
} from '@utils/auth'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ReactComponent as Dropdown } from '@images/dropdown.svg'
import { ReactComponent as UserDropdown } from '@images/user-dropdown-menu.svg'

import UserDropdownMenu from '@images/user-dropdown-menu'
import Star from '@images/review-dropdown-star'
import Logout from '@images/logout'
import menu from '@images/menu.svg'
import Admin from '@images/admin'

const Navbar = () => {
  const [currentUser, setCurretUser] = useState({
    email: '',
    name: '',
    mediaMatch: false
  })
  const [drawer, setDrawer] = useState(false)
  const { user_name } = getAccessTokenDecoded()
  const isValid = isTokenValid()
  const location = useLocation()
  const isAdmin = isAllowedByRole(['ROLE_ADMIN'])
  const isMemberOrAdmin = isAllowedByRole(['MEMBER', 'ROLE_ADMIN'])

  window.addEventListener('resize', () => {
    const md = document.documentElement.clientWidth < 576
    setCurretUser({ ...currentUser, mediaMatch: md })
  })

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData')!)
    const name = authData ? authData.userName : ''
    setCurretUser({ ...currentUser, email: user_name, name })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, user_name, currentUser.mediaMatch])

  const handleLogout = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    logout()
  }

  return (
    <nav className="row bg-primary main-nav navbar-expand-lg navbar-dark bg-primary">
      <div className="navbar">
        <Link
          to="/"
          className="logo-text col-3"
          style={
            !isValid && currentUser.mediaMatch
              ? { justifyContent: 'center', marginLeft: 'calc(100% - 75vw)' }
              : {}
          }
        >
          MovieFlix
        </Link>
        {isValid && (
          <button
            className="menu-mobile-btn"
            type="button"
            onClick={() => setDrawer(!drawer)}
          >
            <img src={menu} alt="Mobile menu" />
          </button>
        )}
        {isValid && (
          <div
            className={
              drawer ? 'menu-mobile-container' : 'navbar-current-items d-flex'
            }
            style={drawer && isAdmin ? { height: '180px' } : {}}
          >
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-togglenew"
                href="#"
                data-bs-toggle="dropdown"
              >
                <UserDropdown style={{ marginRight: '5px' }} />
                {currentUser.name}
                <Dropdown style={{ marginLeft: '5px' }} />
              </a>
              <ul className="dropdown-menu fade-up">
                <li>
                  <Link
                    className="dropdown-item"
                    to="account"
                    onClick={() => setDrawer(false)}
                  >
                    <UserDropdownMenu color={drawer ? '#ffffff' : '#9e9e9e'} />
                    &nbsp; Minha conta
                  </Link>
                </li>
                {isMemberOrAdmin && (
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/reviews"
                      onClick={() => setDrawer(false)}
                    >
                      <Star color={drawer ? '#ffffff' : '#6c6c6c'} /> My Reviews
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin"
                      onClick={() => setDrawer(false)}
                    >
                      <Admin color={drawer ? '#ffffff' : '#6c6c6c'} />
                      &nbsp; Administração
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      logout()
                      setDrawer(false)
                    }}
                  >
                    <Logout color={drawer ? '#ffffff' : '#9e9e9e'} /> Sair
                  </button>
                </li>
              </ul>
            </li>

            <div
              title={currentUser.email}
              className="col-9 auth-button btn btn-primary mt-1"
              onClick={handleLogout}
            >
              SAIR
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
