export interface CatalogFilters {
  search?: string;
  ordering?: CatalogOrdering;
  tag?: number;
  category?: number | null;
  minPrice?: number;
  maxPrice?: number;
  brandIds?: number[];
  limit?: number;
}

export enum CatalogOrdering {
  PRICE_LOW_HIGH = 'price',
  PRICE_HIGH_LOW = '-price',
  RATING_LOW_HIGH = 'rating',
  RATING_HIGH_LOW = '-rating',
}

export enum ReviewsOrdering {
  Date = 'created_at',
  Rating = 'rating',
  Votes = 'votes',
}
