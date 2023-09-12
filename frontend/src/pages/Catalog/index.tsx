import { useState } from 'react';
import { useDebounce, useSyncQueryParam } from '../../hooks';
import { useGetProductsQuery } from '../../redux/apis/productsApi';
import { SidebarForm } from './SidebarForm';
import { CatalogRowForm } from './CatalogRowForm';
import { ProductCard } from '../../components/ProductCard';
import css from './index.module.css';
import { CatalogOrdering } from '../../types/filters';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { useSearchParams } from 'react-router-dom';

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Поиск
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search, 500);

  // Сортировка
  const queryParamOrdering = searchParams.get('ordering') || '';
  const validatedQueryParamOrdering = (
    Object.values<string>(CatalogOrdering).includes(queryParamOrdering)
    ? queryParamOrdering
    : CatalogOrdering.RATING_HIGH_LOW
  ) as CatalogOrdering;

  const [ordering, setOrdering] = useState(validatedQueryParamOrdering);

  // Фильтрация по тегу
  const [tag, setTag] = useState<number>(Number(searchParams.get('tag') || '0'));

  // Минимальная и максимальная цена
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('minPrice') || '0'));
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice') || '0'));

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  // Подкатегории
  const [subcategoryIds, setSubcategoryIds] = useState<number[]>(
    searchParams.getAll('subcategory').map(Number)
  );

  // Бренды
  const [brandIds, setBrandIds] = useState<number[]>(
    searchParams.getAll('brand').map(Number)
  );

  // Синхронизация состояния с query parameters
  useSyncQueryParam(
    [
      ['search', debouncedSearch],
      ['ordering', ordering],
      ['tag', tag],
      ['minPrice', debouncedMinPrice],
      ['maxPrice', debouncedMaxPrice],
      ['brand', brandIds],
      ['subcategory', subcategoryIds],
    ],
    setSearchParams,
  );

  const { data, isLoading } = useGetProductsQuery({
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
          {
            isLoading
            ? <SpinnerScreen />
            : data && (
              <div className={css.products}>
                {data?.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
