import './styles.scss'

import Star from '@images/icon-star.svg'
import { Review } from '@type/Review'

type ReviewProps = {
  review: Review
}

export const UserAvaliation = ({ review }: ReviewProps) => {
  return (
    <div className="user-avaliation-container pt-3">
      <div className="username">
        <img src={Star} alt="estrela amarela" />
        <span> {review?.user.name}</span>
      </div>
      <div className="comment border-radius-20">
        <p>{review.text}</p>
      </div>
    </div>
  )
}

export default UserAvaliation
