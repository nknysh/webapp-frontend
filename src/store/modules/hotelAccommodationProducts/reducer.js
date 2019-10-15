import { initialState } from 'store/common';
import { createReducer } from 'store/utils';

import { actionTypes } from './actions';

const isProductPhoto = (upload, productUuid) => {
  return upload.tag === 'photo' && upload.ownerType === 'Product' && upload.ownerUuid === productUuid;
};

const isFloorPlan = (upload, productUuid) => {
  return upload.tag === 'floorPlan' && upload.ownerType === 'Product' && upload.ownerUuid === productUuid;
};

const extractDisplayInformationForHotelAccommodationProduct = bookingBuilderResponse => {
  const accommodationProduct = bookingBuilderResponse.potentialBooking.Accommodation[0].product;
  return {
    uuid: accommodationProduct.uuid,
    title: accommodationProduct.name,
    description: accommodationProduct.meta.description,
    amenities: accommodationProduct.meta.amenities,
    moreInformation: accommodationProduct.meta.moreInformation,
    size: accommodationProduct.meta.size,
    occupancy: accommodationProduct.options.occupancy,
    categoryType: accommodationProduct.meta.categoryType,
    errors: bookingBuilderResponse.errors,
    photos: bookingBuilderResponse.uploads.filter(u => isProductPhoto(u, accommodationProduct.uuid)),
    floorPlans: bookingBuilderResponse.uploads.filter(u => isFloorPlan(u, accommodationProduct.uuid)),
    category: accommodationProduct.category,
    dates: bookingBuilderResponse.potentialBooking.Accommodation[0].dates,
    datesCount: bookingBuilderResponse.potentialBooking.Accommodation[0].dates.length,
    totals: {
      ...bookingBuilderResponse.totals,
    },
    appliedOfferNames: bookingBuilderResponse.appliedOfferNames,
    potentialBooking: bookingBuilderResponse.potentialBooking,
    availableToHold: bookingBuilderResponse.availableToHold,
  };
};

export const handleFetchCurrentHotelAccommodationProducts = (state, { payload }) => {
  state.data = payload.map(extractDisplayInformationForHotelAccommodationProduct);
  return state;
};

export const handleFetchCurrentHotelAccommodationProductsFail = (state, { payload }) => {
  state.error = payload.error;
  return state;
};

export default createReducer(
  {
    [actionTypes.FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS]: handleFetchCurrentHotelAccommodationProducts,
    [actionTypes.FETCH_CURRENT_HOTEL_ACCOMMODATION_PRODUCTS_FAIL]: handleFetchCurrentHotelAccommodationProductsFail,
  },
  initialState
);
