export interface ListProduct {
  id: number;
  name: string;
  image: string;
  brand: Brand;
  subcategory: Subcategory;
  tags: Tag[];
  variants: Variant[];
  avg_rating: number;
  reviews_count: number;
}

export interface DetailProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  brand: Brand;
  subcategory: Subcategory;
  variants: Variant[];
  avg_rating: number;
  silimar_products: ListProduct[];
  bought_together_products: ListProduct[];
  reviews: Review[];
}

export interface Review {
  id: number;
  user: ReviewUser;
  variant: string;
  created_at: string;
  text: string;
  votes: number;
  rating: number;
}

interface ReviewUser {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
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

export interface Variant {
  name: string;
  price: Price;
}

export interface Price {
  id: number;
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

