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
import { ReactComponent as Admin } from '@images/admin.svg'

import UserDropdownMenu from '@images/user-dropdown-menu'
import Star from '@images/review-dropdown-star'
import Logout from '@images/logout'

const Navbar = () => {
  const [currentUser, setCurretUser] = useState({ email: '', name: '' })
  const { user_name } = getAccessTokenDecoded()
  const isValid = isTokenValid()
  const location = useLocation()
  const isAdmin = isAllowedByRole(['ROLE_ADMIN'])
  const isMemberOrAdmin = isAllowedByRole(['MEMBER', 'ROLE_ADMIN'])

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData')!)
    const name = authData ? authData.userName : ''
    setCurretUser({ ...currentUser, email: user_name, name })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, user_name])

  const handleLogout = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    logout()
  }

  return (
    <nav className="row bg-primary main-nav">
      <div className="navbar">
        <Link to="/" className="logo-text col-3">
          MovieFlix
        </Link>
        {isValid && (
          <div className="navbar-current-items d-flex">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-togglenew"
                href="#"
                data-bs-toggle="dropdown"
              >
                <UserDropdown style={{ marginRight: '5px' }} />{' '}
                {currentUser.name}
                <Dropdown style={{ marginLeft: '5px' }} />
              </a>
              <ul className="dropdown-menu fade-up">
                <li>
                  <Link className="dropdown-item" to="account">
                    <UserDropdownMenu color="#9e9e9e" /> My account
                  </Link>
                </li>
                {isMemberOrAdmin && (
                  <li>
                    <Link className="dropdown-item" to="/reviews">
                      <Star color="#6c6c6c" /> My Reviews
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      <Admin color="#6c6c6c" /> Administração
                    </Link>
                  </li>
                )}
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    <Logout color="#9e9e9e" /> Sign Out
                  </button>
                </li>
              </ul>
            </li>

            <div
              title={currentUser.email}
              className="col-9 auth-button btn btn-primary"
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
