import { IHotel } from './HotelResponse';
import { EBookingStatus } from './BookingsListResponse';
export type AgeName = 'Infant' | 'Child' | 'Adult' | 'default';

export interface Meta {
  type: string;
  isCountryMatch: boolean;
}

export interface Country {
  code: string;
  name: string;
  isDestination: boolean;
}

export interface Upload {
  uuid: string;
  filename: string;
  displayName: string;
  url: string;
  size: string;
  tag: string;
  ownerType: string;
  ownerUuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuestAges {
  numberOfAdults: number;
  agesOfAllChildren: number[];
}

export interface TransferReference {
  uuid: string;
  direction?: 'in' | 'out';
}

export interface GroundServiceReference {
  uuid: string;
}

export interface FineReference {
  uuid: string;
}

export interface SupplementReference {
  uuid: string;
}

export interface UuidReference {
  uuid: string;
}

export interface SelectedSubproducts {
  'Meal Plan'?: UuidReference[];
  Supplement?: UuidReference[];
}

export interface SelectedAccommodation {
  uuid: string;
  guestAges: GuestAges;
  repeatCustomer: boolean;
  startDate: string;
  endDate: string;
  subProducts: SelectedSubproducts;
}

export interface CustomItemPayload {
  total?: string;
  name?: string;
  description?: string;
  countsAsMealPlan?: boolean;
  countsAsTransfer?: boolean;
}

export interface BookingBuilderRequest {
  startDate: string;
  endDate: string;
  guestAges: GuestAges;
  hotelUuid: string;
  Accommodation: SelectedAccommodation[];
  Transfer: TransferReference[];
  'Ground Service': GroundServiceReference[];
  Fine: FineReference[];
  Supplement: SupplementReference[];
  customItems: CustomItemPayload[];
}

export interface AgeRange {
  name: AgeName;
  ageFrom: number;
  ageTo: number;
}
export interface Occupancy2 {
  standardOccupancy: number;
  maximumPeople: number;
  limits: AgeLimit[];
}

export interface ProductOptions {
  isGenericProduct?: boolean;
  agesDefinedBy?: string;
  genericIdentifier?: string;
  isOneWay?: boolean;
  ages?: AgeRange[];
  occupancy?: Occupancy2;
  capacity?: number;
}

export interface AgeLimit {
  name: AgeName;
  minimum: number;
  maximum: number;
}

export interface Occupancy {
  standardOccupancy: number;
  maximumPeople: number;
  limits: AgeLimit[];
}

export interface ProductMeta {
  description?: string;
  size?: number;
  amenities?: string[];
  categoryType?: string;
  moreInformation?: string;
}

export interface ProductAges {
  uuid: string;
  ageNames: string[];
}

export interface Product {
  uuid: string;
  name: string;
  type: string;
  category: string;
  options: ProductOptions;
  meta: ProductMeta;
  ownerType: string | null;
  ownerUuid: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Date {
  startDate: string;
  endDate: string;
}

export interface StayLength {
  minimum?: number;
  maximum?: number;
}

export interface Prerequisites {
  dates: Date[];
  maximumLodgingsInBooking: number;
  stayLength: StayLength;
  accommodationProducts: string[];
}

export interface AccommodationProductDiscount {
  discountPercentage: number;
  greenTaxDiscountApproach: string;
}

export interface DateValuePair {
  [key: string]: number;
}

export interface OfferQuantity {
  [key: string]: number;
}

export interface ApplicationHistory {
  remainingQuantity: DateValuePair;
  offerQuantity: OfferQuantity;
}

export interface Supplement {
  title: string;
  product: Product;
  rateUuid: string;
  accommodationProductRateUuid?: any;
  rateType: string;
  quantity: number;
  dates: string[];
  offers: OfferApplication[];
  singlePrice: string;
  isOnRequest: boolean;
  totalCents: number;
  total: string;
  totalBeforeDiscountCents: number;
  totalBeforeDiscount: string;
}

export interface AppliedSubProductDiscount {
  products: ProductAges[];
  discountPercentage: number;
  maximumQuantity: number;
  greenTaxDiscountApproach: string;
  applicationHistory_0: ApplicationHistory;
}

export interface AppliedSuplement {
  products: Product[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  breakdown: Breakdown[];
  mandatory: boolean;
  selected: boolean;
}

export interface subProductDiscounts {
  Supplement: AppliedSubProductDiscount[];
}

export interface OfferApplication {
  offer: Offer;
  datesCovered: string[];
  datesApplied: string[];
  discountPercentage: number;
  quantity: number;
}

export interface Offer {
  uuid: string;
  name: string;
  order: number;
  hotelUuid: string;
  combines: boolean;
  combinesWith: string[];
  cannotCombineWith?: any;
  termsAndConditions: string;
  furtherInformation?: any;
  prerequisites: Prerequisites4;
  preDiscount: boolean;
  stepping?: any;
  accommodationProductDiscount: AccommodationProductDiscount;
  subProductDiscounts: subProductDiscounts;
  productDiscounts?: any;
  createdAt: string;
  updatedAt: string;
}

interface Options2 {
  ages: AgeRange[];
}

export interface MealPlan {
  title: string;
  product: Product;
  rateUuid: string;
  accommodationProductRateUuid: string;
  rateType: string;
  quantity: number;
  dates: string[];
  offers: any[];
  singlePrice: string;
  isOnRequest: boolean;
  totalCents: number;
  total: string;
  totalBeforeDiscountCents: number;
  totalBeforeDiscount: string;
}

export interface AppliedMealPlan {
  products: Product[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  breakdown: Breakdown[];
  mandatory: boolean;
  selected: boolean;
}

export interface Date2 {
  startDate: string;
  endDate: string;
}

export interface StayLength2 {
  minimum: number;
}

export interface Prerequisites2 {
  dates: Date2[];
  maximumLodgingsInBooking: number;
  stayLength: StayLength2;
  accommodationProducts: string[];
}

export interface SubProducts {
  'Meal Plan': MealPlan[];
  Supplement: Supplement[];
}

export interface Accommodation {
  title: string;
  product: Product;
  rateUuid: string;
  accommodationProductRateUuid?: any;
  rateType: string;
  quantity: number;
  dates: string[];
  offers: OfferApplication[];
  singlePrice: string;
  isOnRequest: boolean;
  totalCents: number;
  total: string;
  totalBeforeDiscountCents: number;
  totalBeforeDiscount: string;
  subProducts: SubProducts;
  paymentTerms: string;
  cancellationPolicy: string;
  minimumNights?: number;
}

export interface ProductSetAccommodation {
  products: Product[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  breakdown: Breakdown[];
  mandatory: boolean;
  selected: boolean;
  availableSubProductSets: AvailableSubProductSets;
  occupancyResult: OccupancyResult;
}

export interface Transfer2 {
  title: string;
  product: Product;
  rateUuid: string;
  accommodationProductRateUuid?: any;
  rateType: string;
  quantity: number;
  dates: string[];
  offers: any[];
  singlePrice: string;
  isOnRequest: boolean;
  totalCents: number;
  total: string;
  totalBeforeDiscountCents: number;
  totalBeforeDiscount: string;
  cancellationPolicy: string;
  paymentTerms: string;
}

export interface PotentialBooking {
  Accommodation: Accommodation[];
  Supplement: any[];
  Transfer: Transfer2[];
  'Ground Service': any[];
  Fine: any[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Prerequisites3 {
  dates: DateRange[];
  maximumLodgingsInBooking: number;
  stayLength: StayLength;
  accommodationProducts: string[];
}

export interface ApplicationHistory {
  remainingQuantity: DateValuePair;
  offerQuantity: DateValuePair;
}

export interface Breakdown {
  title: string;
  product: Product;
  rateUuid: string;
  accommodationProductRateUuid?: any;
  rateType: string;
  quantity: number;
  dates: string[];
  offers: OfferApplication[];
  singlePrice: string | null;
  isOnRequest: boolean;
  totalCents: number | null;
  total: string | null;
  totalBeforeDiscountCents: number | null;
  totalBeforeDiscount: string | null;
}

export interface Prerequisites4 {
  dates: DateRange[];
  maximumLodgingsInBooking: number;
  stayLength: StayLength;
  accommodationProducts: string[];
}

export interface AvailableSubProductSets {
  'Meal Plan': AppliedMealPlan[];
  Supplement: AppliedSuplement[];
}

export interface RequestedAgeGroups {
  Infant: number;
  Child: number;
  default: number;
  'Young Child'?: number;
}

export interface ExtraPersonSupplementsRequired {
  default: number;
}

export interface OccupancyResult {
  permitted: boolean;
  requestedAgeGroups: RequestedAgeGroups;
  ageRanges: AgeRange[];
  occupancy: Occupancy;
  remainingStandardOccupancy: number;
  extraPersonSupplementsRequired: ExtraPersonSupplementsRequired;
}

export interface Transfer {
  products: Product[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  breakdown: Breakdown[];
  mandatory: boolean;
  selected: boolean;
  meta: any;
}

export interface GroundService {
  products: Product[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string;
  totalBeforeDiscount: string;
  breakdown: Breakdown[];
  mandatory: boolean;
  selected: boolean;
}

export interface Fine {
  products: Product[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total?: any;
  totalBeforeDiscount?: any;
  breakdown: Breakdown[];
  mandatory: boolean;
  selected: boolean;
}

export interface AvailableProductSets {
  Accommodation: ProductSetAccommodation[];
  Supplement: AppliedSuplement[];
  Transfer: Transfer[];
  'Ground Service': GroundService[];
  Fine: Fine[];
}

export interface Totals {
  oneOrMoreItemsOnRequest: boolean;
  totalForPricedItemsCents: number;
  totalBeforeDiscountForPricedItemsCents: number;
  totalForPricedItems: string;
  totalBeforeDiscountForPricedItems: string;
  total: string;
  totalBeforeDiscount: string;
}

export interface BookingBuilderResponse {
  canBeBooked: boolean;
  mustStop: boolean;
  errors: any[];
  currency: string;
  bookingHash: string | undefined;
  availableToHold: boolean;
  potentialBooking: PotentialBooking;
  availableProductSets: AvailableProductSets;
  textOnlyOffersPerLodging: any[][];
  appliedOfferNames: string[];
  uploads: Upload[];
  hotel: IHotel;
  totals: Totals;
  minimumNightsReview: boolean;
  displayTotals: IDisplayTotalsBreakdown;
}

export interface AggregateRecord {
  title: string;
  quantity: number;
  oneOrMoreItemsOnRequest: boolean;
  totalForPricedItemsCents: number;
  totalBeforeDiscountForPricedItemsCents: number;
  totalForPricedItems: string;
  totalBeforeDiscountForPricedItems: string;
  total: string;
  totalBeforeDiscount: string;
  offers: string[];
  drilldown: AggregateRecord[];
  dateLevel?: boolean;
}

export interface IDisplayTotalItem {
  title: string;
  labels: string[];
  isOnRequestOrPartiallyOnRequest: boolean;
  total: string | null;
  totalBeforeDiscount: string | null;
  offers: string[];
}

export interface IDsiplayTotalBlock {
  header: string;
  items: IDisplayTotalItem[];
  blockType: string;
}

export interface IDisplayTotals {
  oneOrMoreItemsOnRequest: boolean;
  totalForPricedItemsCents: number;
  totalBeforeDiscountForPricedItemsCents: number;
  totalForPricedItems: string;
  totalBeforeDiscountForPricedItems: string;
  total: string | null;
  totalBeforeDiscount: string | null;
}

export interface IDisplayTotalsBreakdown {
  blocks: IDsiplayTotalBlock[];
  appliedOfferNames: string[];
  totals: IDisplayTotals;
}

export interface BookingBuilder {
  request: BookingBuilderRequest;
  response: BookingBuilderResponse;
}

export interface HotelResult {
  uuid: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: string;
  countryCode: string;
  region: string;
  starRating: string;
  defaultCurrency: string;
  amenities: string[];
  highlights: string[];
  additionalInfo: string | null;
  policiesAndRestrictions: string[] | null;
  suitableForHoneymooners: boolean;
  preferred: boolean;
  overview: string[];
  filters: string[];
  inLoveWith: string;
  createdAt: string;
  updatedAt: string;
  uploads: Upload[];
  bookingBuilder: BookingBuilder;
}

export interface OffersSearchData {
  countries: Country[];
  hotels: HotelResult[];
}

export interface OffersSearchSuccessResponse {
  meta: Meta;
  data: OffersSearchData;
}

export interface HotelAccommodationProduct {
  uuid: string;
  title: string;
  description: string;
  size: number;
  categoryType: string;
  category: string;
  datesCount: number;
  availableToHold: boolean;
  defaultMealPlanUuid: string;
  amenities: string[];
  occupancy: any;
  errors: any[];
  photos: any[];
  floorPlans: any[];
  dates: string[];
  totals: any[];
  appliedOfferNames: string[];
  potentialBooking: any;
}

export interface IBookingTravelAgent {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  phoneNumber: string;
  mobileNumber: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  countryCode: string;
  status: string;
  isExistingPartner: boolean;
  agreeToTerms: string;
  type: string;
  receiveEmailAlerts: string;
  companyUuid: string;
  companySignupInfo: {
    name: string;
    countryCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IBooking {
  agesOfAllChildren?: number[];
  bookingComments?: string;
  bookingHash?: string;
  breakdown?: BookingBuilderResponse;
  checkInDate?: string;
  checkOutDate?: string;
  clientUuid?: null;
  comments?: string;
  createdAt?: string;
  deletedAt?: null;
  flightArrivalDate?: null;
  flightArrivalNumber?: string;
  flightDepartureDate?: null;
  flightDepartureNumber?: string;
  guestEmail?: string;
  guestFirstName?: string;
  guestLastName?: string;
  guestTitle?: string;
  hotelName?: string;
  hotelUuid?: string;
  internalComments?: string;
  isRepeatGuest?: boolean;
  numAdults?: number;
  overrideTotal?: null;
  proposalUuid?: string;
  specialRequests?: string[];
  status?: EBookingStatus;
  taMarginAmount?: string;
  taMarginType?: string;
  travelAgentUserUuid?: string;
  updatedAt?: string;
  uuid?: string;
  humanReadableId?: string;
  stateHistory?: IBookingStateHistory[];
  travelAgent?: IBookingTravelAgent;
}

export interface IBookingStateHistory {
  status: EBookingStatus;
  timestamp: string;
}

export interface IOldBooking extends IBooking {
  breakdown: any;
}
