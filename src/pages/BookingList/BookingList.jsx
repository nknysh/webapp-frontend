import React from 'react';

import { BookingListContainer } from 'containers';

import { propTypes, defaultProps } from './BookingList.props';

export const BookingList = () => <BookingListContainer />;

BookingList.propTypes = propTypes;
BookingList.defaultProps = defaultProps;

export default BookingList;
