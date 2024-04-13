import css from './index.module.css';

export const Information = ({ text }: { text: string }) => (
  <div className={css.container}  >
    <span className={css.icon}>i</span>
    <p>{text}</p>
  </div>
);
