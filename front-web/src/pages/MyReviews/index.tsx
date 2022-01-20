import './styles.scss'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { MyReviews } from '@type/Review'
import { makePrivateRequest } from '@utils/request'
import { isAllowedByRole } from '@utils/auth'

import CardReview from '@components/CardReview'
import { Modal } from '@components/InfoModal'
import ReviewsLoader from '@components/Loaders/ReviewsLoader'

import animal from '@images/animal.svg'

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
          {/* TODO: Fazer modal personalizado*/}
          {error && <Modal close={handleCloseModal} />}
          {myReview && myReview?.length > 0 ? (
            <h1>Minhas Avaliações</h1>
          ) : (
            <>
              <h2>Você ainda não fez nenhuma avaliação</h2>
              <img
                className="empty"
                src={animal}
                alt="um gato com uma expressão de curiosidade"
              />
            </>
          )}
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
