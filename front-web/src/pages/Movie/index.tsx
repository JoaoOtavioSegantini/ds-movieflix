import './styles.scss'

import Card from '@components/Card'
import Pagination from '@components/Pagination'
import MovieFilter from '@components/MovieFilter'
import MovieCardLoader from '@components/Loaders/MovieCardLoader'
import { makePrivateRequest } from '@utils/request'
import { Genre, MoviesResponse } from '@type/Movie'

import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Movies = () => {
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>()
  const [load, setLoad] = useState(false)
  const [active, setActive] = useState(0)
  const [genre, setGenre] = useState<Genre>()

  const handleChangeGenre = (genre: Genre) => {
    setActive(0)
    setGenre(genre)
  }

  const getMovies = useCallback(() => {
    const params = {
      page: active,
      linesPerPage: 12,
      genreId: genre?.id
    }
    setLoad(true)
    makePrivateRequest({ url: '/movies', params })
      .then((response) => setMoviesResponse(response.data))
      .finally(() => {
        setLoad(false)
      })
  }, [active, genre])

  useEffect(() => {
    getMovies()
  }, [getMovies, genre])

  return (
    <div className="movie-container card-base">
      <div className="filter-genres-card-container">
        <MovieFilter genre={genre} handleChangeGenre={handleChangeGenre} />
      </div>
      <div className="list-of-movies">
        {load ? (
          <MovieCardLoader />
        ) : (
          moviesResponse?.content.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <Card movie={movie} />
            </Link>
          ))
        )}
      </div>
      {moviesResponse && moviesResponse?.content.length > 0 && (
        <Pagination
          onChange={(page) => setActive(page)}
          totalPages={moviesResponse.totalPages}
        />
      )}
    </div>
  )
}

export default Movies
