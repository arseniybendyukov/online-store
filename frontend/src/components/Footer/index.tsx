import { Link } from 'react-router-dom';
import { NamedLink } from '../../types/common';
import { ADDRESS, PHONE_NUMBER, SCHEDULE } from '../../consts';
import { FooterBlock } from './FooterBlock';
import { SocialMedias } from '../SocialMedias';
import { Copyright } from './Copyright';
import css from './index.module.css';
import { NavPaths } from '../../navigation';

const catalogLinks: NamedLink[] = [
  {
    path: '#',
    name: 'Инвентарь для химчистки',
  },
  {
    path: '#',
    name: 'Средства для химчистки',
  },
  {
    path: '#',
    name: 'Средства для клининга',
  },
  {
    path: '#',
    name: 'Инвентарь для мятья окон',
  },
];

const blogLinks: NamedLink[] = [
  {
    path: '#',
    name: 'Обзоры',
  },
  {
    path: '#',
    name: 'Новинки',
  },
  {
    path: '#',
    name: 'Подборки',
  },
  {
    path: '#',
    name: 'Новости',
  },
];

const companyLinks: NamedLink[] = [
  {
    path: NavPaths.ABOUT,
    name: 'О нас',
  },
  {
    path: NavPaths.CONTACTS,
    name: 'Контакты',
  },
  {
    path: NavPaths.HOW_TO_BUY,
    name: 'Купить',
  },
  {
    path: '#',
    name: 'Часто задаваемые вопросы',
  },
];

export function Footer() {
  return (
    <footer className={css.footer}>
      <div className='container'>
        <div className={css.blocks}>
          <FooterBlock heading='Контакты'>
            <div className={css.block}>
              <span className={css.phone}>{PHONE_NUMBER}</span>
              <p className={css.addressAndSchedule}>
                <span>{SCHEDULE}</span>
                <span>{ADDRESS}</span>
              </p>
              <SocialMedias />
            </div>
          </FooterBlock>

          <FooterLinksBlock
            heading='Каталог'
            links={catalogLinks}
          />

          <FooterLinksBlock
            heading='Блог'
            links={blogLinks}
          />

          <FooterLinksBlock
            heading='Компания'
            links={companyLinks}
          />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}

interface FooterLinksBlockProps {
  heading: string;
  links: NamedLink[];
}

function FooterLinksBlock({ heading, links }: FooterLinksBlockProps) {
  return (
    <FooterBlock heading={heading}>
      <div className={css.block}>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={css.link}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </FooterBlock>
  );
}
