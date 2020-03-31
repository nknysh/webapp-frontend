import {
  showCustomItemFormAction,
  hideCustomItemFormAction,
  updateCustomItemNameAction,
  updateCustomItemTotalAction,
  updateCustomItemDescriptionAction,
  updateCustomItemCountsAsMealPlanAction,
  updateCustomItemCountsAsTransferAction
} from './actions';


describe('Bookin Builder Custom Item actions', () => {
  it('Returns the correct object literals', () => {
    expect(showCustomItemFormAction()).toMatchSnapshot();
    expect(hideCustomItemFormAction()).toMatchSnapshot();

    expect(updateCustomItemNameAction('sample name')).toMatchSnapshot();
    expect(updateCustomItemTotalAction('10.00')).toMatchSnapshot();
    expect(updateCustomItemDescriptionAction('sample description')).toMatchSnapshot();
    expect(updateCustomItemCountsAsMealPlanAction(true)).toMatchSnapshot();
    expect(updateCustomItemCountsAsTransferAction(true)).toMatchSnapshot();
  });
});
