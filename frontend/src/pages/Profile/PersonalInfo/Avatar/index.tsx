import css from './index.module.css';
import { useEffect, useState } from 'react';
import { ReactComponent as Pencil } from '../../../../images/pencil.svg';
import { useUpdateAvatarMutation } from '../../../../redux/api';
import { Spinner } from '../../../../components/Spinner';
import { CircleAvatar } from '../../../../components/CircleAvatar';

interface Props {
  initials: string;
  color: string;
  image: string | null;
}

export function Avatar({ initials, color, image }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  useEffect(() => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage)
      updateAvatar(formData);
    }
  }, [selectedImage]);

  return (
    <div className={css.avatar}>
      <div className={css.avatarPick}>
        <label htmlFor='avatar-picture-picker' className={css.label}>
          <Pencil className={css.pencilSVG} />
        </label>

        <input
          type='file'
          accept='image/*'
          name='avatar'
          id='avatar-picture-picker'
          className={css.input}
          onChange={(e) => setSelectedImage((e.target.files ?? [null])[0])}
        />
      </div>

      {isLoading && (
        <div className={css.spinner}>
          <Spinner color='#fff' />
        </div>
      )}

      <CircleAvatar
        size='large'
        image={image}
        initials={initials}
        color={color}
      />
    </div>
  );
}
