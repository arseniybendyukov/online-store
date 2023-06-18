import css from './index.module.css';

interface Props {
  name: string;
  color: string;
}

export const Tag = ({ name, color }: Props) => (
  <div className={css.tag} style={{ background: color }}>
    {name}
  </div>
);
