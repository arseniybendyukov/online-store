export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  brand: Brand;
  subcategory: Subcategory;
  tags: Tag[];
  variants: Variant[];
  silimar_products: Product[];
  bought_together_products: Product[];
  avg_rating: number;
  reviews_count: number;
}

interface Brand {
  id: number;
  name: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

interface Subcategory extends Category {
  category: Category;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

interface Variant {
  name: string;
  price: Price;
}

export interface Price {
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
}

export interface MinMax {
  min: number;
  max: number;
}

interface ListSubcategory extends Category {
  count: number; 
}

export interface ListCategory extends ListSubcategory {
  subcategories: ListSubcategory[];
}

export interface ListBrand {
  id: number;
  name: string;
  count: number;
}

