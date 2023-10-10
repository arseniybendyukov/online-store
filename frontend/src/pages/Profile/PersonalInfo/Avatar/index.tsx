import css from './index.module.css';
import { useEffect, useState } from 'react';
import { ReactComponent as Pencil } from '../../../../images/pencil.svg';
import { useUpdateAvatarMutation } from '../../../../redux/apis/authApi';
import { Spinner } from '../../../../components/Spinner';

interface Props {
  image?: string | null;
}

export function Avatar({ image }: Props) {
  const [selectedImage, setSelectedImage] = useState<unknown | null>(null);
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  useEffect(() => {
    if (image) {
      setSelectedImage(image);
      // todo: преобразовать объект картинки, чтобы отправить на бэк
      // updateAvatar(image);
    }
  }, [image]);

  return (
    <div className={css.avatar}>
      <div className={css.avatarPick}>
        <label htmlFor='avatar-picture-picker' className={css.label}>
          <Pencil className={css.pencilSVG} />
        </label>

        <input type='file' name='avatar' id='avatar-picture-picker' className={css.input} />
      </div>

      {isLoading && (
        <div className={css.spinner}>
          <Spinner color='#fff' />
        </div>
      )}

      {image && (
        // todo: кривой тип у user.image
        <img src={image ?? undefined} alt='avatar' className={css.image} />
      )}
    </div>
  );
}
