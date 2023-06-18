import { ProductCard } from '../../components/ProductCard';
import { useGetProductsQuery } from '../../redux/productsApi';
import css from './index.module.css';

export function Catalog() {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <main className={`container ${css.container}`}>
      <h1 className={`h1 ${css.h1}`}>Каталог товаров</h1>
      <div className={css.content}>
        <aside className={css.aside}></aside>
        <div className={css.main}>
          <div className={css.products}>
            {isLoading ? 'Загрузка...' : (
              data?.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
