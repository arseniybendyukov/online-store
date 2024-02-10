import { Link } from "react-router-dom";
import css from './index.module.css';
import { headerLinks } from "../../../navigation";

export const NavLinks = () => (
  <nav className={css.links}>
    {headerLinks.map(({ path, name }) => (
      <Link key={path} className={css.link} to={path}>{name}</Link>
    ))}
  </nav>
);
