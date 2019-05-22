import { connect } from 'react-redux';

import {
  getAddonsTotals,
  getGroundServiceProductsTotal,
  getTransferProductsTotal,
  getBookingTotal,
} from 'store/modules/booking/selectors';
import {
  getHotelsRate,
  getHotelAddons,
  getHotelsGroundServiceProducts,
  getHotelsTransferProducts,
} from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  addons: getHotelAddons(state, hotelUuid),
  addonsTotals: getAddonsTotals(state, hotelUuid),
  getRate: id => getHotelsRate(state, id),
  groundServices: getHotelsGroundServiceProducts(state, hotelUuid),
  groundServicesTotal: getGroundServiceProductsTotal(state, hotelUuid),
  transfers: getHotelsTransferProducts(state, hotelUuid),
  transfersTotal: getTransferProductsTotal(state, hotelUuid),
  total: getBookingTotal(state, hotelUuid),
});

export default connect(mapStateToProps);
