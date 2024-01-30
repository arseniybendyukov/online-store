import { useEffect, useState } from 'react';
import { useDebounce, useSearchParamsState } from '../../hooks';
import { useGetCategoriesQuery, useGetMinMaxPriceQuery, useGetProductsQuery } from '../../redux/api';
import { FiltersForm } from './FiltersForm';
import { CatalogRowForm } from './CatalogRowForm';
import { ProductCard } from '../../components/ProductCard';
import css from './index.module.css';
import { CatalogOrdering } from '../../types/filters';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { CategoryBreadCrumps } from '../../components/CategoryBreadCrumps';
import { CategoryCards } from './CategoryCards';
import { Button } from '../../components/Button';
import { ReactComponent as ArrowDown } from '../../images/arrow.svg';

export function Catalog() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  // Все продукты
  const [areProductsShown, setAreProductsShown] = useSearchParamsState(
    'show-all',
    (searchParams) => !!searchParams.get('show-all'),
  );


  // Поиск
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500);


  // Сортировка
  const [ordering, setOrdering] = useSearchParamsState(
    'ordering',
    (searchParams) => {
      const raw = searchParams.get('ordering') || '';
      return (
        Object.values<string>(CatalogOrdering).includes(raw)
        ? raw
        : CatalogOrdering.RATING_HIGH_LOW
      ) as CatalogOrdering;
    },
  );


  // Фильтрация по тегу
  const [tag, setTag] = useSearchParamsState(
    'tag',
    (searchParams) => Number(searchParams.get('tag') || '0'),
  );


  // Категории
  const [selectedCategoryId, setSelectedCategoryId] = useSearchParamsState(
    'category',
    (searchParams) => {
      const raw = searchParams.get('category');
      return raw !== null
      ? Number(raw)
      : null
    },
  );
  

  // Минимальная и максимальная цена
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const {
    data: minMaxPrice,
    isLoading: isLoadingMinMaxPrice,
  } = useGetMinMaxPriceQuery();

  useEffect(() => {
    if (minMaxPrice) {
      setMinPrice((prevMin) => prevMin ? prevMin : minMaxPrice.min);
      setMaxPrice((prevMax) => prevMax ? prevMax : minMaxPrice.max);
    }
  }, [minMaxPrice]);


  // Бренды
  const [brandIds, setBrandIds] = useSearchParamsState(
    'brand',
    (searchParams) => searchParams.getAll('brand').map(Number),
  );

  const { data, isLoading } = useGetProductsQuery({
    search: debouncedSearch,
    ordering,
    tag,
    category: selectedCategoryId,
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    brandIds,
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  return (
    <main className={`container ${css.container}`}>
      {categories && (
        <CategoryBreadCrumps
          selectedId={selectedCategoryId}
          categories={categories}
        />
      )}

      <h1 className={`h1 ${css.h1}`}>Каталог товаров</h1>
      
      {
        isLoadingCategories
        ? (
          // TODO: skeleton loading
          <>Загрузка...</>
        ) : (
          categories && (
            <CategoryCards
              categories={categories}
              selectedId={selectedCategoryId}
              setSelectedId={setSelectedCategoryId}
            />
          )
        )
      }

      {!selectedCategoryId && !areProductsShown && (
        <Button
          className={css.showAllButton}
          onClick={() => setAreProductsShown(true)}
          state={{
            default: {
              text: 'Все товары',
              icon: <ArrowDown className={css.arrowDownSVG} width={30} height={30} />,
            }
          }}
        />
      )}

      {(selectedCategoryId || areProductsShown) && (
        <div className={css.content}>
          <FiltersForm
            isOpened={isFormOpened}
            close={() => setIsFormOpened(false)}
            categories={categories}
            isLoadingCategories={isLoadingCategories}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            isLoadingMinMaxPrice={isLoadingMinMaxPrice}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            brandIds={brandIds}
            setBrandIds={setBrandIds}
          />
          <div className={css.main}>
            <CatalogRowForm
              openFilters={() => setIsFormOpened(true)}
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
                  {data?.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      willBecomeMobile
                    />
                  ))}
                </div>
              )
            }
          </div>
        </div>
      )}
    </main>
  );
}
