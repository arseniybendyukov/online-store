import { useEffect } from "react";
import { useGetBrandsQuery, useGetCategoriesQuery, useGetMinMaxPriceQuery } from "../../../redux/productsApi";
import { RangeInput } from "../../../components/RangeInput";
import { CategoryAccordionSelect } from "../../../components/CategoryAccordionSelect";
import { CheckboxSelect } from "../../../components/CheckboxSelect";
import { SidebarSection } from "./SidebarSection";
import { SetState } from "../../../types/common";

interface Props {
  minPrice: number;
  setMinPrice: SetState<number>;
  maxPrice: number;
  setMaxPrice: SetState<number>;
  subcategoryIds: number[];
  setSubcategoryIds: SetState<number[]>;
  brandIds: number[];
  setBrandIds: SetState<number[]>;
}

export function SidebarForm({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  subcategoryIds,
  setSubcategoryIds,
  brandIds,
  setBrandIds,
}: Props) {
  const {
    data: minMaxPrice,
    isLoading: isLoadingMinMaxPrice,
  } = useGetMinMaxPriceQuery();

  const {
    data: categories=[],
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  const {
    data: brands=[],
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
      <SidebarSection heading='Цена'>
        {isLoadingMinMaxPrice
          ? 'Загрузка цен...'
          : minMaxPrice && <RangeInput
              min={minPrice}
              max={maxPrice}
              setMin={setMinPrice}
              setMax={setMaxPrice}
            />
        }
      </SidebarSection>
      
      <SidebarSection heading='Категории'>
        {isLoadingCategories
          ? 'Загрузка категорий...'
          : <CategoryAccordionSelect
              selectedIds={subcategoryIds}
              setSelectedIds={setSubcategoryIds}
              nodes={categories.map((category) => ({
                id: category.id,
                label: `${category.name} (${category.count})`,
                children: category.subcategories.map((subcategory) => ({
                  id: subcategory.id,
                  label: `${subcategory.name} (${subcategory.count})`,
                }))
              }))}
            />
        }
      </SidebarSection>

      <SidebarSection heading='Бренды'>
        {isLoadingBrands
          ? 'Загрузка брендов...'
          : <CheckboxSelect
              selectedIds={brandIds}
              setSelectedIds={setBrandIds}
              options={brands.map((brand) => ({
                id: brand.id,
                label: `${brand.name} (${brand.count})`,
              }))}
            /> 
        }
      </SidebarSection>
    </div>
  );
}
