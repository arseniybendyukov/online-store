import { useEffect, useState } from "react";
import { useGetBrandsQuery, useGetCategoriesQuery, useGetMinMaxPriceQuery } from "../../../redux/productsApi";
import { RangeInput } from "../../../components/RangeInput";
import { CategoryAccordionSelect } from "../../../components/CategoryAccordionSelect";
import { CheckboxSelect } from "../../../components/CheckboxSelect";
import { SidebarSection } from "./SidebarSection";

export function SidebarForm() {
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

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [subcategoryIds, setSubcategoryIds] = useState<number[]>([]);
  const [brandIds, setBrandIds] = useState<number[]>([]);

  useEffect(() => {
    if (minMaxPrice) {
      setMinPrice(minMaxPrice.min);
      setMaxPrice(minMaxPrice.max);
    }
  }, [minMaxPrice])

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
      
      <SidebarSection heading='Категория'>
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
