export interface AppealInput {
  full_name: string;
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
  brand: Brand;
  category: Category;
  tags: Tag[];
  variants: Variant[];
  avg_rating: number;
  reviews_count: number;
}

export interface DetailProduct {
  id: number;
  render_name: string;
  description: string;
  brand: Brand;
  category: Category;
  ph_level: number | null;
  article: string | null;
  variants: Variant[];
  avg_rating: number;
  reviews_count: number;
  silimar_products: ListProduct[];
  bought_together_products: ListProduct[];
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
  manufacturer_country: null | {
    name: string;
  };
}

export interface BrandImage {
  id: number;
  image: string;
}

export interface BrandCount {
  id: number;
  name: string;
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
  is_in_stock: boolean;
  image: string;
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
  cart_item_id: number | null;
  is_saved: boolean;
}

export interface MinMax {
  min: number;
  max: number;
}

export interface CategoryIds {
  id: number;
  name: string;
}

export interface TreeCategory {
  id: number;
  name: string;
  image: string | null;
  count: number;
  children: TreeCategory[] | null;
  parents: CategoryIds[] | null;
}

export interface SavedProductVariant {
  id: number;
  name: string;
  is_in_stock: boolean;
  image: string;
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
  product: VariantProduct;
  cart_item_id: number | null;
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

interface VariantProduct {
  id: number;
  render_name: string;
}

export interface CartItem {
  id: number;
  amount: number;
  variant: CartVariant;
}

export interface CartVariant {
  id: number;
  name: string;
  is_in_stock: boolean;
  image: string;
  actual_price: number;
  sale_price: number | null;
  percentage: number | null;
  product: VariantProduct;
  is_saved: boolean;
  weight: number;
  width: number;
  height: number;
  length: number;
}

export interface DeliveryInfo {
  address: string;
  delivery_sum: number;
  tariff: string;
}

type OptionalDeliveryInfo = { [K in keyof DeliveryInfo]?: DeliveryInfo[K] };

export interface OderedProductInput extends OptionalDeliveryInfo {
  products: {
    origin_variant: number;
    amount: number;
  }[];
  promocode?: number | null;
  is_pickup: boolean;
}

export interface OrderedProduct {
  id: number;
  name: string;
  image: string;
  actual_price: number;
  sale_price: number | null;
  variant_name: string;
  amount: number;
  is_review_allowed: boolean;
  origin_variant: null | {
    id: number;
    product: number;
  };
}

interface OrderStageType {
  id: number;
  name: string;
  description: string;
  is_payment_stage: boolean;
}

export interface OrderStage {
  id: number;
  is_done: boolean;
  stage_type: OrderStageType;
  modified_at: string;
}

export interface Promocode {
  id: number;
  name: string;
  percentage: number;
}

export interface Order {
  id: number;
  is_active: boolean;
  products: OrderedProduct[];
  created_at: string;
  approx_delivery_date: string | null;
  is_cancelled: boolean;
  delivery_sum?: number;
  promocode: Promocode | null;
  is_pickup: boolean;
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

export interface Payment {
  confirmation: {
    confirmation_token: string;
  };
}
