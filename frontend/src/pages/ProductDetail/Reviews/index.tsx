import { useCreateReviewMutation, useGetReviewsByIdQuery } from '../../../redux/apis/productsApi';
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
import { CreateReviewModal } from './CreateReviewModal';
import { RadioVariants } from '../../../components/RadioVariants';
import { Variant } from '../../../types/data';
import { RadioStars } from '../../../components/RadioStars';
import { useFormik } from 'formik';
import { REQUIRED_FIELD } from '../../../utils/forms';
import { Input } from '../../../components/Input';

interface FormValues {
  rating: number;
  variant: Variant | null;
  text: string;
}

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  if (values.rating === 0) {
    errors.rating = 'Укажите оценку товара!';
  }

  if (values.variant === null) {
    errors.variant = 'Выберите вариант товара!';
  }

  if (!values.text) {
    errors.text = REQUIRED_FIELD;
  }

  return errors;
}

export function ProductReviews() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  // todo: состояние загрузки; сбросить и закрыть форму.
  const [createReview] = useCreateReviewMutation();

  const [ordering, setOrdering] = useState<OrderingParam<ReviewsOrdering>>({
    param: ReviewsOrdering.Date,
    isReversed: false,
    isDesc: false,
  });

  const { reviews: { id, avgRating, product } } = useOutletContext<ProductDetailOutletContext>();
  
  const { data: reviews = [], isLoading } = useGetReviewsByIdQuery({
    id,
    ordering: paramToString(ordering),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      rating: 0,
      variant: null,
      text: '',
    },
    validate,
    onSubmit: (values) => {
      if (values.variant) {
        createReview({
          rating: values.rating,
          text: values.text,
          variant: values.variant.pk,
        });
      }
    },
  });

  return (
    <div className={css.container}>
      {isLoading ? 'Загрузка отзывов...' : <>
        <CreateReviewModal
          isOpened={isModalOpened}
          close={() => setIsModalOpened(false)}
        >
          <form className={css.form} onSubmit={formik.handleSubmit}>
            <div className={css.labeled}>
              <Label label='Выберите вариант товара' gap={10}>
                <RadioVariants
                  options={product.variants}
                  selectedVariant={formik.values.variant}
                  setSelectedVariant={(value) => formik.setFieldValue('variant', value)}
                  isTouched={formik.touched.variant}
                  error={formik.errors.variant}
                />
              </Label>

              <Label label='Оцените товар' gap={10}>
                <RadioStars
                  selectedRating={formik.values.rating}
                  setSelectedRating={(value) => formik.setFieldValue('rating', value)}
                  isTouched={formik.touched.rating}
                  error={formik.errors.rating}
                />
              </Label>
            </div>

            <Input
              identity='textarea'
              rows={7}
              label='Текст отзыва'
              name='text'
              onChange={formik.handleChange}
              value={formik.values.text}
              isTouched={formik.touched.text}
              error={formik.errors.text}
            />

            <Button
              type='submit'
              state={{ default: { text: 'Отправить', icon: undefined } }}
            />
          </form>
        </CreateReviewModal>

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
