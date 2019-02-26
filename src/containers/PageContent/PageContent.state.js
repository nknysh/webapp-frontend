import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getPageId, getPageTitle, getPageData, getPageLinks, getPageHero } from 'store/modules/pages/selectors';
import { getPageById } from 'store/modules/pages/actions';

export const mapStateToProps = state => ({
  id: getPageId(state),
  title: getPageTitle(state),
  data: getPageData(state),
  links: getPageLinks(state),
  hero: getPageHero(state),
});

export const mapDispatchToProps = dispatch => ({
  getPage: pipe(
    getPageById,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
