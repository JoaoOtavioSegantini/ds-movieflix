import './styles.scss'
//REACT_APP_WAIT_ON_TIMEOUT=600000
//REACT_APP_WAIT_ON_INTERVAL=600000

import UserAvaliation from '@components/UserAvaliation'
import { Movie } from '@type/Movie'
import { makePrivateRequest } from '@utils/request'
import { isAllowedByRole } from '@utils/auth'
import MovieCardDetailsLoader from '@components/Loaders/MovieCardDetailsLoader'
import SaveAvaliationLoader from '@components/Loaders/SaveAvaliationLoader'
import ReviewsLoader from '@components/Loaders/ReviewsLoader'
import { Modal } from '@components/InfoModal'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ResizeObserver from 'resize-observer-polyfill'

type ParamsType = {
  movieId: string
}

const MovieDetails = () => {
  const { movieId } = useParams<ParamsType>()
  const [movie, setMovie] = useState<Movie>()
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [moreInformation, setMoreInformation] = useState(false)

  useEffect(() => {
    setLoad(true)
    makePrivateRequest({ url: `/movies/${movieId}` })
      .then((response) => {
        setMovie(response.data)
      })
      .finally(() => {
        setLoad(false)
      })
      .catch((err) => toast.error(err.message))
  }, [movieId])

  useEffect(() => {
    const texts = document.querySelectorAll('p.description')

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList[
          entry.target.scrollHeight > entry.contentRect.height + 25
            ? 'add'
            : 'remove'
        ]('truncated')
      }
    })

    texts.forEach((text) => observer.observe(text))
  })

  const member = isAllowedByRole(['MEMBER'])

  const movieIdParsed = Number(movieId)

  const saveAvaliation = () => {
    if (!member) return
    const saveRev = document.querySelectorAll('input')[1]?.value
    if (!saveRev.match(/^(?!\s*$).+/)) return setError(true)

    makePrivateRequest({
      url: '/reviews',
      method: 'POST',
      data: { movieId: movieIdParsed, text: saveRev }
    })
      .then((userReview) => {
        toast.success(`Avaliação do filme ${movie?.title} enviada com sucesso!`)

        const movieReviews = movie?.reviews
        const reviewsUpdated = movieReviews!.concat(userReview.data)

        setMovie({ ...movie!, reviews: reviewsUpdated })

        const clearInput = document.querySelectorAll('input')[1]
        clearInput!.value = ''
      })
      .catch((err) => {
        toast.error(err.message)
        setError(false)
      })
  }

  const handleCloseModal = () => {
    setError(false)
  }

  return (
    <div className="movie-details-container">
      {load ? (
        <>
          <MovieCardDetailsLoader />
          <SaveAvaliationLoader />
          <ReviewsLoader />
        </>
      ) : (
        <>
          {error && <Modal close={handleCloseModal} />}
          <div className="movie-details d-flex card-base">
            <div className="movie-main-image">
              <img src={movie?.imgUrl} width={526} height={320} />
            </div>
            <div className="movie-main-details">
              <div className="card-title-detail" data-testid="movie-title">
                <span>{movie?.title}</span>
              </div>
              <div className="card-year-detail">
                <span>{movie?.year}</span>
              </div>
              <div className="card-synopsis-detail">
                <span>{movie?.subTitle}</span>
              </div>
              <div className="card-description border-radius-20">
                <blockquote>
                  <input
                    type="checkbox"
                    className="more-information"
                    id={`movie-${movie?.id}`}
                    data-testid="view-more"
                  />
                  <p className="description">{movie?.synopsis}</p>
                  <label
                    className="label-more"
                    htmlFor={`movie-${movie?.id}`}
                    onClick={() => setMoreInformation(!moreInformation)}
                  >
                    {moreInformation ? 'Resumir' : 'Ver tudo'}
                  </label>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="input-save-avaliation card-base d-block mt-3">
            <input
              className="avaliation-container col-6"
              placeholder="Deixe sua avaliação aqui"
              data-testid="avaliation-save-input-main"
              disabled={!member}
              title={
                !member ? 'Somente membros podem salvar uma avaliação' : ''
              }
            />
            <div
              className={`btn btn-primary save-avaliation col-6 ${
                !member ? 'invalid-save-review' : ''
              }`}
              style={{ width: '334px' }}
              data-testid="review-onsave"
              onClick={saveAvaliation}
              title={
                !member ? 'Somente membros podem salvar uma avaliação' : ''
              }
            >
              SALVAR AVALIAÇÃO
            </div>
          </div>
          {movie?.reviews && movie.reviews.length > 0 && (
            <div className="user-avaliation card-base mt-3">
              {movie?.reviews.map((review) => (
                <UserAvaliation review={review} key={review.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MovieDetails
