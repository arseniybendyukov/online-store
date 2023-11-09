import { useEffect } from "react";
import { useGetBrandsQuery, useGetCategoriesQuery, useGetMinMaxPriceQuery } from "../../../redux/apis/productsApi";
import { RangeInput } from "../../../components/RangeInput";
import { CheckboxSelect } from "../../../components/CheckboxSelect";
import { SidebarSection } from "./SidebarSection";
import { SetState } from "../../../types/common";
import { Spinner } from "../../../components/Spinner";

interface Props {
  minPrice: number;
  setMinPrice: SetState<number>;
  maxPrice: number;
  setMaxPrice: SetState<number>;
  brandIds: number[];
  setBrandIds: SetState<number[]>;
}

export function SidebarForm({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  brandIds,
  setBrandIds,
}: Props) {
  const {
    data: minMaxPrice,
    isLoading: isLoadingMinMaxPrice,
  } = useGetMinMaxPriceQuery();

  const {
    data: categories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  const {
    data: brands,
    isLoading: isLoadingBrands,
  } = useGetBrandsQuery();

  useEffect(() => {
    if (minMaxPrice) {
      setMinPrice(minMaxPrice.min);
      setMaxPrice(minMaxPrice.max);
    }
  }, [minMaxPrice]);

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
        {/* todo: место для нового дерева категорий */}
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
