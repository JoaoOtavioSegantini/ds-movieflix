import { isAllowedByRole, isAuthenticated, Authority } from '@utils/auth'
import { Redirect, Route } from 'react-router'

type Props = {
  children: React.ReactNode
  path: string
  allowedRoutes?: Authority[]
  exact?: boolean
}

const PrivateRoute = ({ children, path, allowedRoutes, exact }: Props) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) => {
        if (!isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          )
        } else if (isAuthenticated() && !isAllowedByRole(allowedRoutes)) {
          return <Redirect exact to={{ pathname: '/movies' }} />
        }

        return children
      }}
    />
  )
}

export default PrivateRoute
