import { useGetBrandCountsQuery } from '../../../redux/apis/productsApi';
import { RangeInput } from '../../../components/RangeInput';
import { CheckboxSelect } from '../../../components/CheckboxSelect';
import { Section } from './Section';
import { SetState } from '../../../types/common';
import { CategoryTree } from '../../../components/CategoryTree';
import { TreeCategory } from '../../../types/data';
import css from './index.module.css';
import { ReactComponent as Cross } from '../../../images/cross.svg'

interface Props {
  isOpened: boolean;
  close: () => void;
  categories?: TreeCategory[];
  isLoadingCategories: boolean;
  selectedCategoryId: number | null;
  setSelectedCategoryId: SetState<number | null>;
  isLoadingMinMaxPrice: boolean;
  minPrice: number | null;
  setMinPrice: SetState<number | null>;
  maxPrice: number | null;
  setMaxPrice: SetState<number | null>;
  brandIds: number[];
  setBrandIds: SetState<number[]>;
}

export function FiltersForm({
  isOpened,
  close,
  categories,
  isLoadingCategories,
  selectedCategoryId,
  setSelectedCategoryId,
  isLoadingMinMaxPrice,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  brandIds,
  setBrandIds,
}: Props) {

  const {
    data: brands,
    isLoading: isLoadingBrands,
  } = useGetBrandCountsQuery();

  return (
    <div className={`${css.wrapper} ${isOpened ? css.opened : ''}`}>
      <div className={css.container}>
        <header className={css.header}>
          <h2 className='h2'>Фильтры</h2>
          <button onClick={close} className={css.closeButton}>
            <Cross className={css.crossSVG} />
          </button>
        </header>


        <div className={css.content}>
          <Section
            heading='Цена'
            isLoading={isLoadingMinMaxPrice}
          >
            <RangeInput
              min={minPrice}
              max={maxPrice}
              setMin={setMinPrice}
              setMax={setMaxPrice}
            />
          </Section>
          
          <Section
            heading='Категории'
            isLoading={isLoadingCategories}
          >
            {categories && (
              <CategoryTree
                categories={categories}
                selectedId={selectedCategoryId}
                setSelectedId={setSelectedCategoryId}
              />
            )}
          </Section>

          <Section
            heading='Бренды'
            isLoading={isLoadingBrands}
          >
            {brands && (
              <CheckboxSelect
                selectedIds={brandIds}
                setSelectedIds={setBrandIds}
                options={brands.map((brand) => ({
                  id: brand.id,
                  label: `${brand.name} (${brand.count})`,
                }))}
              />
              )
            }
          </Section>
        </div>
      </div>
    </div>
  );
}
