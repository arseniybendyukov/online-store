import { CircleAvatar } from '../CircleAvatar';
import css from './index.module.css';

interface Props {
  firstName: string;
  lastName: string;
  color: string;
  image: string | null;
}

export const UserInfo = ({ firstName, lastName, color, image }: Props) => (
  <div className={css.userInfo}>
    <CircleAvatar
      size='medium'
      image={image}
      initials={firstName[0] + lastName[0]}
      color={color}
    />

    <h3 className={`h3 ${css.fullname}`}>
      {`${firstName} ${lastName}`}
    </h3>
  </div>
);
