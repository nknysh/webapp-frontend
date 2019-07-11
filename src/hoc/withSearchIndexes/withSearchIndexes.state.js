import { connect } from 'react-redux';
import { reduce, merge, keys, values } from 'ramda';

import { getIndex, getIndexesStatus } from 'store/modules/indexes';

const mapStateToProps = (state, { indexes }) => {
  const buildIndex = (accum, index) => merge(accum, { [index]: getIndex(state, index) });
  const buildIndexes = reduce(buildIndex, {});

  const searchIndexes = buildIndexes(indexes);

  return {
    indexStatus: getIndexesStatus(state),
    indexKeys: keys(searchIndexes),
    indexes: values(searchIndexes),
  };
};

export default connect(mapStateToProps);
