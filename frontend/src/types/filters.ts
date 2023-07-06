export const enum CatalogOrdering {
  PRICE_LOW_HIGH = 'price',
  PRICE_HIGH_LOW = '-price',
  RATING_LOW_HIGH = 'rating',
  RATING_HIGH_LOW = '-rating',
}

export const enum ReviewsOrdering {
  Date = 'created_at',
  Rating = 'rating',
  Votes = 'votes',
}
