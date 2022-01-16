import './styles.scss'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { MyReviews } from '@type/Review'
import { makePrivateRequest } from '@utils/request'
import { isAllowedByRole } from '@utils/auth'

import CardReview from '@components/CardReview'
import { Modal } from '@components/InfoModal'
import ReviewsLoader from '@components/Loaders/ReviewsLoader'

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

  const removeAvaliation = (id: number, title: string) => {
    if (!member) return

    const confirm = window.confirm(
      `Tem certeza que deseja remover a review do filme ${title}`
    )
    if (!confirm) return
    makePrivateRequest({ url: `/reviews/${id}`, method: 'DELETE' })
      .then(() => {
        const newReviews = myReview!.filter((review) => review.id != id)
        setMyReview(newReviews as [MyReviews])
        toast.info('Review removida com sucesso!')
      })
      .finally(() => {
        setLoad(false)
      })
      .catch((err) => toast.error(err.message))
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
              <CardReview
                onClick={(id, title) => removeAvaliation(id, title)}
                review={card}
                key={card.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyReviewsPage
