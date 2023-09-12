import { Link } from 'react-router-dom';
import { NamedLink } from '../../types/common';
import { ADDRESS, PHONE_NUMBER, SCHEDULE } from '../../consts/data';
import { FooterBlock } from './FooterBlock';
import { SocialMedias } from '../SocialMedias';
import { Copyright } from './Copyright';
import css from './index.module.css';
import { NavPaths } from '../../navigation';
import { useGetCategoryIdsQuery } from '../../redux/apis/productsApi';
import { listQueryParam } from '../../utils/queryParams';
import { useGetBlogTagsQuery } from '../../redux/apis/blogApi';

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

export const Footer = () => {
  const {
    data: categoryIds,
    isLoading: isCategoryIdsLoading,
  } = useGetCategoryIdsQuery();

  const {
    data: blogTags,
    isLoading: isBlogTagsLoading,
  } = useGetBlogTagsQuery();

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

          {
            isCategoryIdsLoading
            // todo: skeleton loading
            ? 'Загрузка категорий...'
            : categoryIds && (
              <FooterLinksBlock
                heading='Каталог'
                path={NavPaths.CATALOG}
                links={categoryIds.map((category) => ({
                  name: category.name,
                  path: `${NavPaths.CATALOG}?${listQueryParam('subcategory', category.subcategories)}`,
                }))}
              />
            )
          }

          {
            isBlogTagsLoading
            // todo: skeleton loading
            ? 'Загрузка блога...'
            : blogTags && (
              <FooterLinksBlock
                heading='Блог'
                path={NavPaths.BLOG}
                links={blogTags.map((tag) => ({
                  name: tag.name,
                  path: `${NavPaths.BLOG}?tag=${tag.id}`,
                }))}
              />
            )
          }

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
  path?: string;
  links: NamedLink[];
}

function FooterLinksBlock({
  heading,
  path,
  links,
}: FooterLinksBlockProps) {
  return (
    <FooterBlock heading={heading} path={path}>
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
