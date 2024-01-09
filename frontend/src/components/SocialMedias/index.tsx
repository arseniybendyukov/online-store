import { ReactNode } from 'react';
import css from './index.module.css';
import { ReactComponent as VK } from '../../images/social-medias/vk.svg';
import { ReactComponent as Telegram } from '../../images/social-medias/telegram.svg';
import { ReactComponent as Whatsapp } from '../../images/social-medias/whatsapp.svg';
import { Link } from 'react-router-dom';

interface SocialMedia {
  path: string;
  icon: ReactNode;
}

const socialMedias: SocialMedia[] = [
  {
    path: 'https://vk.com/proffcleanmarket',
    icon: <VK width={40} height={40} />
  },
  {
    path: '#',
    icon: <Telegram width={30} height={30} />
  },
  {
    path: '#',
    icon: <Whatsapp width={35} height={35} />
  },
];

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
