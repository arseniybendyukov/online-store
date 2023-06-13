import css from './index.module.css';

export function Catalog() {
  return (
    <main className={`container ${css.container}`}>
      <h1 className={`h1 ${css.h1}`}>Каталог товаров</h1>
      <div className={css.content}>
        <aside className={css.aside}></aside>
        <div className={css.main}>
          <div className={css.products}></div>
        </div>
      </div>
    </main>
  );
}
