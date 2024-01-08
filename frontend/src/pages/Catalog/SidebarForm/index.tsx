import { useGetBrandCountsQuery } from "../../../redux/apis/productsApi";
import { RangeInput } from "../../../components/RangeInput";
import { CheckboxSelect } from "../../../components/CheckboxSelect";
import { SidebarSection } from "./SidebarSection";
import { SetState } from "../../../types/common";
import { CategoryTree } from "../../../components/CategoryTree";
import { TreeCategory, MinMax } from "../../../types/data";

interface Props {
  categories?: TreeCategory[];
  isLoadingCategories: boolean;
  selectedCategoryId: number | null;
  setSelectedCategoryId: SetState<number | null>;
  minMaxPrice?: MinMax;
  isLoadingMinMaxPrice: boolean;
  minPrice: number;
  setMinPrice: SetState<number>;
  maxPrice: number;
  setMaxPrice: SetState<number>;
  brandIds: number[];
  setBrandIds: SetState<number[]>;
}

export function SidebarForm({
  categories,
  isLoadingCategories,
  selectedCategoryId,
  setSelectedCategoryId,
  minMaxPrice,
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
    <div>
      <SidebarSection
        heading='Цена'
        isLoading={isLoadingMinMaxPrice}
      >
        {minMaxPrice && (
          <RangeInput
            min={minPrice}
            max={maxPrice}
            setMin={setMinPrice}
            setMax={setMaxPrice}
          />
        )}
      </SidebarSection>
      
      <SidebarSection
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
      </SidebarSection>

      <SidebarSection
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
      </SidebarSection>
    </div>
  );
}
