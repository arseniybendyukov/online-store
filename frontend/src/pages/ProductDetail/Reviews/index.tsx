import { useGetReviewsByIdQuery } from "../../../redux/productsApi";
import { Review } from "../../../components/Review";
import { RatingStatsBar } from "../../../components/RatingStatsBar";
import { Label } from "../../../components/Label";
import css from './index.module.css';
import { OutletContext } from "../types";
import { useOutletContext } from "react-router-dom";

export function Reviews() {
  const { reviews: { id, avgRating } } = useOutletContext<OutletContext>();
  
  const { data, isLoading } = useGetReviewsByIdQuery({ id });
  const reviews = data?.reviews || [];

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
          <Label label='Сортировать по'>
            {/* todo: Сделать сортировку */}
            Дате Рейтингу Полезности
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
