import css from './index.module.css';
import { Link } from 'react-router-dom';
import { socialMedias } from '../../consts/social-medias';


interface Props {
  dark?: boolean;
}

export const SocialMedias = ({ dark=false }: Props) => (
  <div className={css.container}>
    {socialMedias.map((socialMedia, index) => (
      <Link
        key={index}
        to={socialMedia.path}
        className={`${css.socialMedia} ${dark ? css.dark : css.light}`}
      >
        {socialMedia.icon}
      </Link>
    ))}
  </div>
);
