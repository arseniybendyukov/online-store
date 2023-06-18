import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { NavPaths } from "../../../navigation";
import css from './index.module.css';

interface Props {
  icon: ReactNode;
  path: NavPaths;
  counter: number;
}

export const IconButton = ({ icon, path, counter }: Props) => (  
  <Link className={css.button} to={path}>
    <span className={css.counter}>{counter}</span>
    {icon}
  </Link>
);
