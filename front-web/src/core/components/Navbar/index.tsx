import './styles.scss'

import { getAccessTokenDecoded, isTokenValid, logout } from '@utils/auth'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [currentUser, setCurretUser] = useState('')
  const { user_name } = getAccessTokenDecoded()
  const isValid = isTokenValid()
  const location = useLocation()

  useEffect(() => {
    setCurretUser(user_name)
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
          <div
            title={currentUser}
            className="col-9 auth-button btn btn-primary"
            onClick={handleLogout}
          >
            SAIR
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
