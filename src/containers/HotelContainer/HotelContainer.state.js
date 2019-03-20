import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsStatus } from 'store/modules/hotels/selectors';
import { fetchHotel } from 'store/modules/hotels/actions';

export const mapStateToProps = (state, { id }) => ({
  hotel: getHotel(state, id),
  hotelStatus: getHotelsStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotel: pipe(
    fetchHotel,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
