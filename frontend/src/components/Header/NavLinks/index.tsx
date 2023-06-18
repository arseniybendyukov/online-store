import { Link } from "react-router-dom";
import { NavPaths } from "../../../navigation";
import css from './index.module.css';

interface PageName {
  path: NavPaths;
  name: string;
}

export const pageNames: PageName[] = [
  {
    path: NavPaths.ABOUT,
    name: 'О нас',
  },
  {
    path: NavPaths.BLOG,
    name: 'Блог',
  },
  {
    path: NavPaths.CATALOG,
    name: 'Каталог',
  },
  {
    path: NavPaths.CONTACTS,
    name: 'Контакты',
  },
  {
    path: NavPaths.HOW_TO_BUY,
    name: 'Как купить',
  },
];

export const NavLinks = () => (
  <div className={css.links}>
    {pageNames.map(({ path, name }) => (
      <Link key={path} className={css.link} to={path}>{name}</Link>
    ))}
  </div>
);
