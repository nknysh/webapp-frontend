import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getPageId, getPageTitle, getPageData, getPageLinks, getPageHero } from 'store/modules/pages/selectors';
import { getPage } from 'store/modules/pages/actions';

export const mapStateToProps = state => ({
  data: getPageData(state),
  hero: getPageHero(state),
  id: getPageId(state),
  links: getPageLinks(state),
  title: getPageTitle(state),
});

export const mapDispatchToProps = dispatch => ({
  getPage: pipe(
    getPage,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
