import { connect } from 'react-redux';
import { reduce, merge, keys, values } from 'ramda';

import { getSearchIndex } from 'store/modules/search/selectors';

const mapStateToProps = (state, { indexes }) => {
  const buildIndex = (accum, index) => merge(accum, { [`${index}Index`]: getSearchIndex(state, index) });
  const buildIndexes = reduce(buildIndex, {});

  const searchIndexes = buildIndexes(indexes);

  return {
    indexKeys: keys(searchIndexes),
    indexes: values(searchIndexes),
  };
};

export default connect(mapStateToProps);
