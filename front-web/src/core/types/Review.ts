import { User } from './User'
import { Movie } from './Movie'

export type Review = {
  id: number
  text: string
  user: User
}

export type MyReviews = Omit<Review, 'user'> &
  Pick<Movie, 'title' | 'subTitle' | 'imgUrl'> & { movieId: number }
