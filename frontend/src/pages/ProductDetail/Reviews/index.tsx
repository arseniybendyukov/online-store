import { useGetReviewsByIdQuery } from "../../../redux/apis/productsApi";
import { Review } from "../../../components/Review";
import { RatingStatsBar } from "../../../components/RatingStatsBar";
import { Label } from "../../../components/Label";
import css from './index.module.css';
import { ProductDetailOutletContext } from "../types";
import { useOutletContext } from "react-router-dom";
import { ReviewsOrdering } from "../../../types/filters";
import { useState } from "react";
import { ArrowOrdering, OrderingParam, paramToString } from "../../../components/ArrowOrdering";

export function ProductReviews() {
  const [ordering, setOrdering] = useState<OrderingParam<ReviewsOrdering>>({
    param: ReviewsOrdering.Date,
    isReversed: false,
    isDesc: false,
  });

  const { reviews: { id, avgRating } } = useOutletContext<ProductDetailOutletContext>();
  
  const { data: reviews = [], isLoading } = useGetReviewsByIdQuery({
    id,
    ordering: paramToString(ordering),
  });

  return (
    <div className={css.container}>
      {isLoading ? 'Загрузка отзывов...' : <>
        <div className={css.side}>
          <RatingStatsBar
            avgRating={avgRating}
            ratings={reviews.map((review) => review.rating)}
          />
        </div>
        <div className={css.main}>
          <h2 className='h2'>Отзывы</h2>
          <Label label='Сортировать по' gap={10}>
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
      </>}
    </div>
  );
}
