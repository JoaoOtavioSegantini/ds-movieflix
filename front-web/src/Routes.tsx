import { Switch, Route, Router, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './core/components/Navbar'
import Movies from './pages/Movie'
import MovieDetails from './pages/MovieDetails'
import history from '@utils/history'
import PrivateRoute from '@components/Routes/PrivateRoute'
import { isAuthenticated } from '@utils/auth'
import MyReviewsPage from './pages/MyReviews'

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
        <PrivateRoute allowedRoutes={['MEMBER']} path="/reviews" exact>
          <MyReviewsPage />
        </PrivateRoute>
        <PrivateRoute path="/movies/:movieId">
          <MovieDetails />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default Routes
