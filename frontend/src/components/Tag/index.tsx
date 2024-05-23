import css from './index.module.css';

interface Props {
  name: string;
  color: string;
  willBecomeMobile?: boolean;
}

export const Tag = ({
  name,
  color,
  willBecomeMobile=false,
}: Props) => (
  <div
    className={`${css.tag} ${willBecomeMobile ? css.mobile : ''}`}
    style={{ color: color, borderColor: color }}
  >
    {name}
  </div>
);
