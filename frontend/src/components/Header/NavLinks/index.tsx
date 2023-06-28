import { Link } from "react-router-dom";
import { NavPaths } from "../../../navigation";
import { NamedLink } from "../../../types/common";
import css from './index.module.css';

export const pageLinks: NamedLink<NavPaths>[] = [
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
    {pageLinks.map(({ path, name }) => (
      <Link key={path} className={css.link} to={path}>{name}</Link>
    ))}
  </div>
);
