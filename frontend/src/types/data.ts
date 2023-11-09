export interface AppealInput {
  full_name: string;
  email: string;
  phone_number: string;
  text: string;
}

export interface Category {
  id: number;
  name: string;
  parent: Category | null;
}

export interface ListProduct {
  id: number;
  render_name: string;
  image: string;
  brand: Brand;
  category: Category;
  tags: Tag[];
  variants: Variant[];
  avg_rating: number;
  reviews_count: number;
  is_saved: boolean;
  is_in_cart: boolean;
}

export interface DetailProduct {
  id: number;
  render_name: string;
  description: string;
  image: string;
  brand: Brand;
  category: Category;
  variants: Variant[];
  avg_rating: number;
  reviews_count: number;
  silimar_products: ListProduct[];
  bought_together_products: ListProduct[];
  is_saved: boolean;
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
  color: string;
  image: string | null;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Variant {
  id: number;
  name: string;
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
  is_in_cart: boolean;
}

export interface MinMax {
  min: number;
  max: number;
}

export interface CategoryIds {
  id: number;
  name: string;
}

export interface ListCategory {
  id: number;
  name: string;
  count: number;
  children: ListCategory[] | null;
  parents: CategoryIds[] | null;
}

export interface SavedProduct {
  id: number;
  render_name: string;
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
  is_my_vote_positive: boolean | null;
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
  is_my_vote_positive: boolean | null;
}

export interface CartItem {
  id: number;
  amount: number;
  variant: CartVariant;
}

interface CartVariant {
  id: number;
  name: string;
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
  product: CartProduct;
}

interface CartProduct {
  id: number;
  render_name: string;
  image: string;
  is_saved: boolean;
}

export interface OderedProductInput {
  variant: number;
  amount: number;
}

interface OrderedVariantProduct {
  id: number;
  render_name: string;
  image: string;
}

interface OrderedVariant {
  id: number;
  name: string;
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
  product: OrderedVariantProduct;
}

export interface OrderedProduct {
  id: number;
  variant: OrderedVariant;
  amount: number;
}

interface OrderStageType {
  id: number;
  name: string;
}

export interface OrderStage {
  id: number;
  is_done: boolean;
  stage_type: OrderStageType;
  modified_at: string;
}

export interface Order {
  id: number;
  is_active: boolean;
  products: OrderedProduct[];
  created_at: string;
  approx_delivery_date: string | null;
}

export interface OrderDetail extends Order {
  stages: OrderStage[];
}

export interface VoteOnReviewInput {
  is_positive: boolean;
  review: number;
}

export interface ReviewCreationInput {
  variant: number;
  rating: number;
  text: string;
}

export interface BlogList {
  id: number;
  image: string;
  heading: string;
  description: string;
  tags: Tag[];
  created_at: string;
}

export interface BlogDetail extends BlogList {
  text: string;
}
