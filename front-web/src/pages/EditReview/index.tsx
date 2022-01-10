import './styles.scss'

import { makePrivateRequest } from '@utils/request'
import { isAllowedByRole } from '@utils/auth'
import MovieCardDetailsLoader from '@components/Loaders/MovieCardDetailsLoader'

import { Modal } from '@components/InfoModal'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Review } from '@type/Review'
import { ReactComponent as Star } from '@images/icon-star.svg'
import { ReactComponent as Check } from '@images/check.svg'
import { ReactComponent as Close } from '@images/close2.svg'
import history from '@utils/history'

type ParamsType = {
  reviewId: string
}

const EditReview = () => {
  const { reviewId } = useParams<ParamsType>()
  const [review, setReview] = useState<Review>()
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoad(true)
    makePrivateRequest({ url: `/reviews/${reviewId}` })
      .then((response) => {
        setReview(response.data)
        console.log(reviewId, response.data)
      })
      .finally(() => {
        setLoad(false)
      })
      .catch((err) => toast.error(err.message))
  }, [reviewId])

  const member = isAllowedByRole(['MEMBER'])

  const saveAvaliation = () => {
    if (!member) return
    const saveRev = document.querySelector('textarea')?.value
    if (!saveRev?.match(/^(?!\s*$).+/)) return setError(true)

    makePrivateRequest({
      url: `reviews/${reviewId}`,
      method: 'PUT',
      data: { text: saveRev }
    })
      .then(() => {
        toast.success(`Avaliação do enviada com sucesso!`)

        history.replace('/reviews')
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
    <div className="my-reviews-container">
      {load ? (
        <>
          <MovieCardDetailsLoader />
        </>
      ) : (
        <>
          {error && <Modal close={handleCloseModal} />}
          <h2>Editar avaliação</h2>
          <div className="movie-details-review">
            <div className="d-flex rev-user">
              <Star width={42} height={35} /> <h3>{review?.user.name}</h3>
              <Star width={42} height={35} />
            </div>
            <div className="card-description review-edit-container d-flex">
              <textarea rows={25} wrap="soft" defaultValue={review?.text} />
            </div>
            <div className="d-flex rev-user">
              <div className="btn btn-primary rev-btn">
                <p onClick={saveAvaliation}>
                  <Check style={{ marginRight: '18px', marginLeft: '21px' }} />
                  SALVAR AVALIAÇÃO
                </p>
              </div>
              <div className="btn btn-primary rev-btn">
                <Link to="../">
                  <Close
                    style={{ marginRight: '18px', marginLeft: '21px' }}
                    className="close-svg"
                  />
                  CANCELAR
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EditReview
