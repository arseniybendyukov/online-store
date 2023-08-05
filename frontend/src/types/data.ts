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
  is_saved: boolean;
  is_in_cart: boolean;
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
  reviews_count: number;
  silimar_products: ListProduct[];
  bought_together_products: ListProduct[];
  is_saved: boolean;
  is_in_cart: boolean;
}

export interface Review {
  id: number;
  user: ReviewUser;
  variant: string;
  created_at: string;
  text: string;
  votes: [number, number];
  rating: number;
}

interface ReviewUser {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
  count: number;
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
  pk: number;
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

export interface SavedProduct {
  id: number;
  name: string;
  image: string;
  variants: Variant[];
  is_in_cart: boolean;
}

export interface MyReview {
  id: number;
  user: ReviewUser;
  variant?: never;
  product: number;
  created_at: string;
  text: string;
  votes: [number, number];
  rating: number;
}

export interface Review {
  id: number;
  user: ReviewUser;
  variant: string;
  product?: never;
  created_at: string;
  text: string;
  votes: [number, number];
  rating: number;
}

export interface CartItem {
  id: number;
  amount: number;
  variant: CartVariant;
}

interface CartVariant {
  pk: number;
  name: string;
  price: Price;
  product: CartProduct;
}

interface CartProduct {
  id: number;
  name: string;
  image: string;
  is_saved: boolean;
}

export interface OderedProductInput {
  variant: number;
  amount: number;
}

interface OrderedVariantProduct {
  id: number;
  name: string;
  image: string;
}

interface OrderedVariant {
  pk: number;
  name: string;
  price: Price;
  product: OrderedVariantProduct;
}

interface OrderedProduct {
  id: number;
  variant: OrderedVariant;
  amount: number;
}

export interface Order {
  created_at: string;
  products: OrderedProduct[];
}
