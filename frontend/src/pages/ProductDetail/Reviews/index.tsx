import { useGetReviewsByIdQuery } from '../../../redux/api';
import { Review } from '../../../components/Review';
import { RatingStatsBar } from '../../../components/RatingStatsBar';
import { Label } from '../../../components/Label';
import css from './index.module.css';
import { ProductDetailOutletContext } from '../types';
import { useOutletContext } from 'react-router-dom';
import { ReviewsOrdering } from '../../../types/filters';
import { useState } from 'react';
import { ArrowOrdering, OrderingParam, paramToString } from '../../../components/ArrowOrdering';
import { Button } from '../../../components/Button';
import { ReactComponent as ReviewSVG } from '../../../images/review.svg';
import { SpinnerScreen } from '../../../components/SpinnerScreen';
import { CreateReviewModalForm } from './CreateReviewModalForm';

export function ProductReviews() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [ordering, setOrdering] = useState<OrderingParam<ReviewsOrdering>>({
    param: ReviewsOrdering.Date,
    isReversed: false,
    isDesc: false,
  });

  const { reviews: { id, avgRating, variants } } = useOutletContext<ProductDetailOutletContext>();
  
  const { data: reviews, isLoading } = useGetReviewsByIdQuery({
    id,
    ordering: paramToString(ordering),
  });

  return <>
    {
      isLoading
      ? <SpinnerScreen height={300} />
      : reviews && (
        reviews.length > 0
        ? (
          <div className={css.container}>
            <CreateReviewModalForm
              isOpened={isModalOpened}
              close={() => setIsModalOpened(false)}
              variants={variants}
            />

            <div className={css.side}>
              <RatingStatsBar
                avgRating={avgRating}
                ratings={reviews.map((review) => review.rating)}
              />

              <Button
                onClick={() => setIsModalOpened((prev) => !prev)}
                state={{
                  default: {
                    text: 'Оставить отзыв',
                    icon: <ReviewSVG className={css.reviewSVG} />,
                  }
                }}
              />
            </div>
            <div className={css.main}>
              <h2 className='h2'>Отзывы</h2>
              
              <Label label='Сортировка по' gap={10}>
                <ArrowOrdering
                  value={ordering}
                  setValue={setOrdering}
                  options={[
                    {
                      name: 'Дате',
                      param: ReviewsOrdering.Date,
                      isDesc: false,
                    },
                    {
                      name: 'Рейтингу',
                      param: ReviewsOrdering.Rating,
                      isDesc: true,
                    },
                    {
                      name: 'Голосам',
                      param: ReviewsOrdering.Votes,
                      isDesc: true,
                    },
                  ]} 
                />
              </Label>

              <div className={css.reviews}>
                {reviews.map((review) => (
                  <Review key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='empty' style={{ minHeight: 300 }}>
            Пока нет ни одного отзыва
          </div>
        )
      )
    }
  </>;
}
