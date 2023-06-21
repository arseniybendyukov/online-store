import { ProductCard } from '../../components/ProductCard';
import { useGetProductsQuery } from '../../redux/productsApi';
import { SidebarForm } from './SidebarForm';
import { CatalogRowForm } from './CatalogRowForm';
import css from './index.module.css';

export function Catalog() {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <main className={`container ${css.container}`}>
      <h1 className={`h1 ${css.h1}`}>Каталог товаров</h1>
      <div className={css.content}>
        <aside className={css.aside}>
          <h3 className='h3'>Фильтры</h3>
          <SidebarForm />
        </aside>
        <div className={css.main}>
          <CatalogRowForm />
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
