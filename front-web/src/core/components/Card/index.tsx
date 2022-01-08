import './styles.scss'

import { Movie } from '@type/Movie'

type MovieBase = {
  movie: Movie
}

const Card = ({ movie }: MovieBase) => (
  <div className="card-container">
    <div className="cards card-base">
      <div className="card-image">
        <img src={movie.imgUrl} loading="lazy" className="movie-image" />
      </div>
      <div className="card-title">
        <span>{movie.title}</span>
      </div>
      <div className="card-year">
        <span>{movie.year}</span>
      </div>
      <div className="card-synopsis">
        <span>{movie.subTitle}</span>
      </div>
    </div>
  </div>
)

export default Card
