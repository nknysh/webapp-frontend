import {
  offerHotelUuidChangeAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerAddStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerSetBooleanPrerequisiteAction,
  offerSetPreDiscountAction,
  offerHotelUuidChangeSuccessAction,
} from '../actions';

describe('Offer sub domain actions', () => {
  it('Returns the correct object literals', () => {
    expect(offerHotelUuidChangeAction('UUID123')).toMatchSnapshot();
    expect(offerNameChangeAction('New Name')).toMatchSnapshot();
    expect(offerTermsChangeAction('New Terms')).toMatchSnapshot();
    expect(offerFurtherInformationChangeAction('New Info')).toMatchSnapshot();
    expect(offerAddStayBetweenPrerequisiteAction()).toMatchSnapshot();
    expect(offerRemoveStayBetweenPrerequisiteAction(99)).toMatchSnapshot();
    expect(offerChangeStayBetweenPrerequisiteAction([['2020-01-01', '2020-02-02']])).toMatchSnapshot();
    expect(offerSetBooleanPrerequisiteAction('birthday', null)).toMatchSnapshot();
    expect(offerSetPreDiscountAction(false)).toMatchSnapshot();
    expect(offerHotelUuidChangeSuccessAction('TEST DATA')).toMatchSnapshot();
  });
});
