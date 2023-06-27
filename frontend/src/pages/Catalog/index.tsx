import { useState } from 'react';
import { useDebounce } from '../../hooks';
import { useGetProductsQuery } from '../../redux/productsApi';
import { SidebarForm } from './SidebarForm';
import { CatalogRowForm } from './CatalogRowForm';
import { ProductCard } from '../../components/ProductCard';
import css from './index.module.css';
import { Ordering } from '../../types/filters';

export function Catalog() {
  // Фильтры (поиск и select)
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  const [ordering, setOrdering] = useState(Ordering.RATING_HIGH_LOW);
  const [tag, setTag] = useState<number>(0);

  // Фильтры (сайдбар)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const [subcategoryIds, setSubcategoryIds] = useState<number[]>([]);
  const [brandIds, setBrandIds] = useState<number[]>([]);

  const { data, isFetching } = useGetProductsQuery({
    search: debouncedSearch,
    ordering,
    tag,
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    subcategoryIds,
    brandIds,
  });

  return (
    <main className={`container ${css.container}`}>
      <h1 className={`h1 ${css.h1}`}>Каталог товаров</h1>
      <div className={css.content}>
        <aside className={css.aside}>
          <h3 className='h3'>Фильтры</h3>
          <SidebarForm
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            subcategoryIds={subcategoryIds}
            setSubcategoryIds={setSubcategoryIds}
            brandIds={brandIds}
            setBrandIds={setBrandIds}
          />
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
