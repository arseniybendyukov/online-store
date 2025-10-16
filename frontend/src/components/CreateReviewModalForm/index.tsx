import css from './index.module.css';
import { useFormik } from 'formik';
import { useDisableScroll } from '../../hooks';
import { useCreateReviewMutation } from '../../redux/api';
import { toast } from 'react-toastify';
import { Label } from '../Label';
import { RadioStars } from '../RadioStars';
import { Input } from '../Input';
import { Button } from '../Button';
import { REQUIRED_FIELD } from '../../utils/forms';
import { Modal } from '../Modal';

interface FormValues {
  rating: number;
  text: string;
}

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  if (values.rating === 0) {
    errors.rating = 'Please rate the product.';
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
        toast('An error occurred while creating the review', { type: 'error' });
      } else {
        toast('Thank you for your review!', { type: 'success' });
        resetForm();
        close();
      }
    },
  });

  return (
    <Modal
      heading='Write a review'
      width={800}
      isOpened={isOpened}
      close={close}
    >
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.labeled}>
          <Label label='Rate the product' gap={10}>
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
          label='Write a review'
          name='text'
          onChange={formik.handleChange}
          value={formik.values.text}
          isTouched={formik.touched.text}
          error={formik.errors.text}
        />

        <Button
          type='submit'
          isLoading={isCreationLoading}
          state={{ default: { text: 'Submit', icon: undefined } }}
        />
      </form>
    </Modal>
  );
}
