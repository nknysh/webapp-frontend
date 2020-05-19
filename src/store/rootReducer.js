import { equals, mapObjIndexed, always } from 'ramda';
import { combineReducers } from 'redux';

import { STATUS_TO_IDLE, STORE_RESET, resetStoreStatuses } from './common';

import auth from './modules/auth/reducer';
import bookings from './modules/bookings/reducer';
import countries from './modules/countries/reducer';
import hotel from './modules/hotel/reducer';
import hotels from './modules/hotels/reducer';
import indexes from './modules/indexes/reducer';
import offers from './modules/offers/reducer';
import pages from './modules/pages/reducer';
import proposals from './modules/proposals/reducer';
import search from './modules/search/reducer';
import ui from './modules/ui/reducer';
import users from './modules/users/reducer';
import travelAgents from './modules/travelAgents/reducer';
import hotelAccommodationProducts from './modules/hotelAccommodationProducts/reducer';
import fastSearch from './modules/fastSearch/reducer';
import bookingBuilder from './modules/bookingBuilder/reducer';
import proposalsList from './modules/proposalsList/reducer';
import bookingsList from './modules/bookingsList/reducer';
import agents from './modules/agents/reducer';
import offersList from './modules/offersList/reducer';
import { offer } from './modules/offer/reducer';
import { bootstrap } from './modules/bootstrap/reducer';
import { ratesImport } from './modules/ratesImport/reducer';
import { allotmentsImport } from './modules/allotmentsImport/reducer';
import { appReducer } from './modules/app/reducer';

const clearState = mapObjIndexed(always(undefined));

const rootReducer = combineReducers({
  auth,
  bookings,
  countries,
  hotel,
  hotels,
  indexes,
  offers,
  pages,
  proposals,
  search,
  ui,
  users,
  hotelAccommodationProducts,
  fastSearch,
  bookingBuilder,
  proposalsList,
  bookingsList,
  offersList,
  travelAgents, // this is the old, dumb as a brick, uncontrollable travel agents reducer
  agents, // this is the good, controlable, travel agents reducer.
  offer,
  bootstrap,
  ratesImport,
  allotmentsImport,
  appReducer,
});

export default (state, action) => {
  const { type } = action;

  if (equals(type, STATUS_TO_IDLE)) {
    state = resetStoreStatuses(state, action);
  }

  if (equals(type, STORE_RESET)) {
    state = clearState(state);
  }

  return rootReducer(state, action);
};
