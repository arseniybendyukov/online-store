import css from './index.module.css';

export function OrderIsCancelled() {
  return (
    <div className={css.cancelled}>Заказ отменен</div>
  );
}
