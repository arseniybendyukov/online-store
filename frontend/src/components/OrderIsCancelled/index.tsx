import css from './index.module.css';

export function OrderIsCancelled() {
  return (
    <div className={css.cancelled}>Order is cancelled</div>
  );
}
