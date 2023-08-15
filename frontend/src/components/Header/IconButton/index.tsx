import { ReactNode } from "react";
import { Link } from "react-router-dom";
import css from './index.module.css';

interface Props {
  icon: ReactNode;
  path: string;
  counter: number;
}

export const IconButton = ({ icon, path, counter }: Props) => (  
  <Link className={css.button} to={path}>
    {counter > 0 && <span className={css.counter}>{counter}</span>}
    {icon}
  </Link>
);
