import { Switch, Route, Router, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './core/components/Navbar'
import Movies from './pages/Movie'
import MovieDetails from './pages/MovieDetails'
import history from '@utils/history'
import PrivateRoute from '@components/Routes/PrivateRoute'
import { isAuthenticated } from '@utils/auth'
import MyReviewsPage from './pages/MyReviews'
import EditReview from './pages/EditReview'

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isAuthenticated() ? (
              <Redirect to="/movies" exact />
            ) : (
              <Home />
            )
          }}
        />
        <PrivateRoute path="/movies" exact>
          <Movies />
        </PrivateRoute>
        <PrivateRoute path="/account">
          <div>Account</div>
        </PrivateRoute>
        <PrivateRoute
          allowedRoutes={['MEMBER', 'ROLE_ADMIN']}
          path="/reviews"
          exact
        >
          <MyReviewsPage />
        </PrivateRoute>
        <PrivateRoute
          allowedRoutes={['MEMBER', 'ROLE_ADMIN']}
          path="/reviews/:reviewId/edit"
        >
          <EditReview />
        </PrivateRoute>
        <PrivateRoute allowedRoutes={['ROLE_ADMIN']} path="/admin">
          <div>Admin</div>
        </PrivateRoute>
        <PrivateRoute path="/movies/:movieId">
          <MovieDetails />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
