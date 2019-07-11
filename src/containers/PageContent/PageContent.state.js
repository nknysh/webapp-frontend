import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getPageById, getPageId, getPageTitle, getPageData, getPageLinks, getPageHero } from 'store/modules/pages';

export const mapStateToProps = state => ({
  data: getPageData(state),
  hero: getPageHero(state),
  id: getPageId(state),
  links: getPageLinks(state),
  title: getPageTitle(state),
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
