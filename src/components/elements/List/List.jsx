import React, { Children } from 'react';
import { equals } from 'ramda';

import { propTypes, defaultProps } from './List.props';
import { Ul, Ol, Li } from './List.styles';

const renderItem = (child, i) => <Li key={i}>{child}</Li>;

export const List = ({ children, type }) => {
  const childrenArr = Children.toArray(children);
  const ListType = equals('ol', type) ? Ol : Ul;

  return <ListType>{Children.map(childrenArr, renderItem)}</ListType>;
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
