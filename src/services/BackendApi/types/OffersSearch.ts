// TODO: Backend API In future, this should be a package of it's own

export enum MealPlanNames {
  ANY = '',
  BREAKFAST_BOARD = 'BB',
  HALF_BOARD = 'HB',
  FULL_BOARD = 'FB',
  ALL_INCLUSIVE = 'AI',
}

export enum Occasion {
  honeymoon = 'honeymoon',
  birthday = 'birthday',
  anniversary = 'anniversary',
  wedding = 'wedding',
}

export type IOccasions = { [key in keyof typeof Occasion]?: boolean };

export enum Filters {
  BEST_FOR_BEACH = 'Best for Beach',
  BEST_FOR_DIVING = 'Best for Diving',
  BEST_FOR_FAMILIES = 'Best for Families',
  BEST_FOR_FIDING = 'Best for Fishing',
  BEST_FOR_LARGE_FAMILY_VILLAS = 'Best for Large Family Villas',
  BEST_FOR_ROMANCE = 'Best for Romance',
  BEST_FOR_SPA = 'Best for Spa',
  BEST_FOR_SPORTS = 'Best for Sports',
  BEST_FOR_WATER_VILLAS = 'Best for Water Villas',
  BEST_FOR_NEW_RESORT = 'Best new resort',
  BEST_OF_THE_BEST = 'Best of the Best',
  CAR_TRANSFER = 'Car transfer',
  DOMESTIC_FLIGHT = 'Domestic Flight',
  HELICOPTER_TRANSFERS = 'Helicopter transfer',
  LUXURY_FOR_LESS = 'Luxury for Less',
  SEAPLANE_TRANSFER = 'Seaplane transfer',
  SPEEDBOAT_TRANSFER = 'Speedboat transfer',
}

export interface IPriceRange {
  min: number | undefined;
  max: number | undefined;
}

export interface IStarRatings {
  '5+'?: boolean;
  '5'?: boolean;
}

export interface ILodging extends IOccasions {
  // TODO: Are the occasions dupes?
  repeatCustomer: boolean;
  numberOfAdults: number;
  agesOfAllChildren?: number[];
}

export enum StarRating {
  FiveStar = '5',
  FiveStarPlus = '5+',
}

export interface ISearchQuery {
  name: string; // Destination
  lodgings: ILodging[];
  startDate: string;
  endDate: string;
  mealPlanCategories: MealPlanNames[];
  regions: string[];
  starRatings: StarRating[];
  filters: Filters[];
  priceRange: IPriceRange;
}

interface IT {
  'hell world': boolean;
}

const blah: IT = {
  'hell world': false,
};
