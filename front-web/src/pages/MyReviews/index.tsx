import './styles.scss'
import { MyReviews } from '@type/Review'
import { makePrivateRequest } from '@utils/request'
import { isAllowedByRole } from '@utils/auth'
import ReviewsLoader from '@components/Loaders/ReviewsLoader'
import { Modal } from '@components/InfoModal'
import { ReactComponent as Edit } from '@images/edit.svg'
import { ReactComponent as Exclude } from '@images/garbage.svg'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const MyReviewsPage = () => {
  const [myReview, setMyReview] = useState<[MyReviews]>()
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoad(true)
    makePrivateRequest({ url: `/reviews/myReviews` })
      .then((response) => {
        setMyReview(response.data)
      })
      .finally(() => {
        setLoad(false)
      })
      .catch((err) => toast.error(err.message))
  }, [])

  const member = isAllowedByRole(['MEMBER'])

  const removeAvaliation = () => {
    if (!member) return
  }
  const handleCloseModal = () => {
    setError(false)
  }

  return (
    <div className="my-reviews-container">
      {load ? (
        <>
          <ReviewsLoader />
          <ReviewsLoader />
          <ReviewsLoader />
        </>
      ) : (
        <>
          {error && <Modal close={handleCloseModal} />}
          <h1>Minhas Avaliações</h1>
          <div className="movie-details-review">
            {myReview?.map((card) => (
              <div
                className="card mb-3 card-my-review"
                style={{ maxWidth: '100%' }}
                key={card.id}
              >
                <div className="row no-gutters">
                  <div className="col-md-3">
                    <Link to={`/movies/${card.movieId}`}>
                      <img
                        src={card.imgUrl}
                        width={250}
                        style={{ height: '100%' }}
                      />
                    </Link>
                  </div>
                  <div className="col-md-6 card-review-container">
                    <div className="card-body">
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text">{card.subTitle}</p>
                      <p className="card-text">
                        <small className="text-muted">{card.text}</small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card-body">
                      <div className="d-flex">
                        <Link
                          to={`/reviews/${card.id}/edit`}
                          className="btn settings-btn"
                          style={{ height: 'auto' }}
                        >
                          <Edit />
                        </Link>
                        <Link
                          to="#"
                          className="btn settings-btn"
                          style={{ height: 'auto' }}
                        >
                          <Exclude />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyReviewsPage
