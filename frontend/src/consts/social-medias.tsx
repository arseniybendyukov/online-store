import { ReactNode } from 'react';
import { ReactComponent as VK } from '../images/social-medias/vk.svg';
import { ReactComponent as Telegram } from '../images/social-medias/telegram.svg';
import { ReactComponent as Whatsapp } from '../images/social-medias/whatsapp.svg';

interface SocialMedia {
  path: string;
  icon: ReactNode;
}

export const socialMedias: SocialMedia[] = [
  {
    path: 'https://vk.com/proffcleanmarket',
    icon: <VK width={40} height={40} />
  },
  {
    path: 'https://t.me/proff_cleanmarket',
    icon: <Telegram width={30} height={30} style={{ transform: 'translate(-2px, 0)' }} />
  },
  {
    path: 'https://wa.me/79137120200',
    icon: <Whatsapp width={35} height={35} />
  },
];
