import { useEffect, useMemo, useState } from 'react';
import { useDebounce, useSyncQueryParam } from '../../hooks';
import { useGetCategoriesQuery, useGetMinMaxPriceQuery, useGetProductsQuery } from '../../redux/apis/productsApi';
import { FiltersForm } from './FiltersForm';
import { CatalogRowForm } from './CatalogRowForm';
import { ProductCard } from '../../components/ProductCard';
import css from './index.module.css';
import { CatalogOrdering } from '../../types/filters';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { useSearchParams } from 'react-router-dom';
import { CategoryBreadCrumps } from '../../components/CategoryBreadCrumps';
import { CategoryCards } from './CategoryCards';

export function Catalog() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Поиск
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search, 500);


  // Сортировка
  const queryParamOrdering = useMemo(() => {
    const raw = searchParams.get('ordering') || '';
    return (
      Object.values<string>(CatalogOrdering).includes(raw)
      ? raw
      : CatalogOrdering.RATING_HIGH_LOW
    ) as CatalogOrdering;
  }, [searchParams]);

  const [ordering, setOrdering] = useState(queryParamOrdering);

  useEffect(() => {
    setOrdering(queryParamOrdering);
  }, [queryParamOrdering]);


  // Фильтрация по тегу
  const queryParamTag = useMemo(() => Number(searchParams.get('tag') || '0'), [searchParams]);

  const [tag, setTag] = useState<number>(queryParamTag);

  useEffect(() => {
    setTag(queryParamTag);
  }, [queryParamTag]);


  // Категории
  const queryParamCategory = useMemo(() => {
    const raw = searchParams.get('category');
    return raw !== null
    ? Number(raw)
    : null
  }, [searchParams]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(queryParamCategory);

  useEffect(() => {
    setSelectedCategoryId(queryParamCategory);
  }, [queryParamCategory]);
  

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
  const queryParamBrands = useMemo(() => searchParams.getAll('brand').map(Number), [searchParams]);

  const [brandIds, setBrandIds] = useState<number[]>(queryParamBrands);

  useEffect(() => {
    setBrandIds(queryParamBrands);
  }, [queryParamBrands]);


  // Синхронизация состояния с query parameters
  useSyncQueryParam(
    [
      ['search', debouncedSearch],
      ['ordering', ordering],
      ['tag', tag],
      ['brand', brandIds],
      ['category', selectedCategoryId],
    ],
    setSearchParams,
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

      {selectedCategoryId && (
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
                  {data?.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              )
            }
          </div>
        </div>
      )}
    </main>
  );
}
