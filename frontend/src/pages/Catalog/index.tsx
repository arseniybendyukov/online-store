import { useState } from 'react';
import { useDebounce } from '../../hooks';
import { useGetProductsQuery } from '../../redux/productsApi';
import { SidebarForm } from './SidebarForm';
import { CatalogRowForm } from './CatalogRowForm';
import { ProductCard } from '../../components/ProductCard';
import css from './index.module.css';
import { Ordering } from '../../types/filters';

export function Catalog() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  const [ordering, setOrdering] = useState(Ordering.RATING_HIGH_LOW);
  const [tag, setTag] = useState<number>(0);

  const { data, isFetching } = useGetProductsQuery({
    search: debouncedSearch,
    ordering,
    tag,
  });

  return (
    <main className={`container ${css.container}`}>
      <h1 className={`h1 ${css.h1}`}>Каталог товаров</h1>
      <div className={css.content}>
        <aside className={css.aside}>
          <h3 className='h3'>Фильтры</h3>
          <SidebarForm />
        </aside>
        <div className={css.main}>
          <CatalogRowForm
            search={search}
            setSearch={setSearch}
            ordering={ordering}
            setOrdering={setOrdering}
            tag={tag}
            setTag={setTag}
          />
          <div className={css.products}>
            {isFetching ? 'Загрузка...' : (
              data?.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
