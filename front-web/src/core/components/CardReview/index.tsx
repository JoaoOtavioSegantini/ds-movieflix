import './styles.scss'

import { MyReviews } from '@type/Review'
import { Link } from 'react-router-dom'

import { ReactComponent as Edit } from '@images/edit.svg'
import { ReactComponent as Exclude } from '@images/garbage.svg'

type ReviewBase = {
  review: MyReviews
}

const CardReview = ({ review }: ReviewBase) => (
  <div className="card mb-3 card-my-review" style={{ maxWidth: '100%' }}>
    <div className="row no-gutters">
      <div className="col-md-3">
        <Link to={`/movies/${review.movieId}`}>
          <img src={review.imgUrl} width={250} style={{ height: '100%' }} />
        </Link>
      </div>
      <div className="col-md-6 card-review-container">
        <div className="card-body">
          <h5 className="card-title">{review.title}</h5>
          <p className="card-text">{review.subTitle}</p>
          <p className="card-text">
            <small className="text-muted">{review.text}</small>
          </p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card-body">
          <div className="d-flex">
            <Link
              to={`/reviews/${review.id}/edit`}
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
)

export default CardReview
