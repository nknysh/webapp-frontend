export const IndexTypes = Object.freeze({
  COUNTRIES: 'countries',
  HOTELS: 'hotels',
});

export const RegionSelectTypes = Object.freeze({
  ALL: 'all',
  SPECIFY: 'specify',
});

export const MealPlanSelectTypes = Object.freeze({
  BB: 'bb',
  HB: 'hb',
  FB: 'fb',
  AI: 'ai',
});

export const ProductTypes = Object.freeze({
  ACCOMMODATION: 'Accommodation',
  MEAL_PLAN: 'Meal Plan',
  TRANSFER: 'Transfer',
  GROUND_SERVICE: 'Ground Service',
  FINE: 'Fine',
  SUPPLEMENT: 'Supplement',
});

export const BookingStatusTypes = Object.freeze({
  POTENTIAL: 'potential',
  REQUESTED: 'requested',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
});

export const SearchPatterns = Object.freeze({
  COUNTRIES: '+isDestination:true *',
});

export const PaymentTypes = Object.freeze({
  // On Request
  CC: 'CC',
  BT: 'BT',
});
