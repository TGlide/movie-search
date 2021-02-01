export interface JustWatchResponse {
  page: number;
  page_size: number;
  total_pages: number;
  total_results: number;
  items: Item[];
}

export interface Item {
  jw_entity_id: string;
  id: number;
  title: string;
  full_path: string;
  full_paths: FullPaths;
  poster: string;
  poster_blur_hash: string;
  original_release_year: number;
  tmdb_popularity: number;
  object_type: string;
  scoring: Scoring[];
  offers?: Offer[];
}

export interface FullPaths {
  MOVIE_DETAIL_OVERVIEW: string;
}

export interface Offer {
  monetization_type: MonetizationType;
  provider_id: number;
  retail_price?: number;
  currency: Currency;
  urls: Urls;
  presentation_type: PresentationType;
}

export enum Currency {
  Eur = "EUR",
}

export enum MonetizationType {
  Buy = "buy",
  Flatrate = "flatrate",
  Rent = "rent",
}

export enum PresentationType {
  HD = "hd",
  SD = "sd",
  The4K = "4k",
}

export interface Urls {
  standard_web: string;
}

export interface Scoring {
  provider_type: string;
  value: number;
}
