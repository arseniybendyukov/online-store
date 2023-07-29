import { Review } from '../../../components/Review';
import { useGetMyReviewsQuery } from '../../../redux/apis/productsApi';
import { ProfileSubpage } from '../common/ProfileSubpage';
import css from './index.module.css';

export function Reviews() {
  const { data, isLoading } = useGetMyReviewsQuery();

  return (
    <ProfileSubpage
      heading='Отзывы на товары'
      itemsCount={data?.length}
      isLoading={isLoading}
    >
      {data && (
        <div className={css.reviews}>
          {data.map((review) => (
            <Review
              key={review.id}
              review={review}
            />
          ))}
        </div>
      )}
    </ProfileSubpage>
  );
}
