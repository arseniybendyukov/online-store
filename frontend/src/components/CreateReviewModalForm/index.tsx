import css from './index.module.css';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { useFormik } from 'formik';
import { useDisableScroll } from '../../hooks';
import { useCreateReviewMutation } from '../../redux/api';
import { toast } from 'react-toastify';
import { Label } from '../Label';
import { RadioStars } from '../RadioStars';
import { Input } from '../Input';
import { Button } from '../Button';
import { REQUIRED_FIELD } from '../../utils/forms';

interface FormValues {
  rating: number;
  text: string;
}

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  if (values.rating === 0) {
    errors.rating = 'Укажите оценку товара!';
  }

  if (!values.text) {
    errors.text = REQUIRED_FIELD;
  }

  return errors;
}

interface Props {
  isOpened: boolean;
  close: () => void;
  variantId: number;
}

export function CreateReviewModalForm({
  isOpened,
  close,
  variantId,
}: Props) {
  const [
    createReview,
    { isLoading: isCreationLoading },
  ] = useCreateReviewMutation();
  
  useDisableScroll(isOpened);

  const formik = useFormik<FormValues>({
    initialValues: {
      rating: 0,
      text: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const result = await createReview({
        rating: values.rating,
        text: values.text,
        variant: variantId,
      });

      if ('error' in result) {
        toast('Произошла ошибка создания отзыва!', { type: 'error' });
      } else {
        toast('Благодарим за оставленный отзыв!', { type: 'success' });
        resetForm();
        close();
      }
    },
  });

  return (
    <div
      onClick={close}
      className={`${css.wrapper} ${isOpened ? css.opened : ''}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.container}
      >
        <div className={css.heading}>
          <h2 className='h2'>Отзыв на товар</h2>
          <button onClick={close}>
            <Cross className={css.crossSVG} />
          </button>
        </div>

        <form className={css.form} onSubmit={formik.handleSubmit}>
          <div className={css.labeled}>
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
            isLoading={isCreationLoading}
            state={{ default: { text: 'Отправить', icon: undefined } }}
          />
        </form>
      </div>
    </div>
  );
}
