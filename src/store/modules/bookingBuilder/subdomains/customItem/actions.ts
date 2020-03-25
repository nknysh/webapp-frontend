export const SHOW_CUSTOM_ITEM_FORM = 'bookingBuilder/customItem/SHOW_CUSTOM_ITEM_FORM';
export const HIDE_CUSTOM_ITEM_FORM = 'bookingBuilder/customItem/HIDE_CUSTOM_ITEM_FORM';

export const UPDATE_CUSTOM_ITEM_NAME = 'bookingBuilder/customItem/UPDATE_CUSTOM_ITEM_NAME';
export const UPDATE_CUSTOM_ITEM_TOTAL = 'bookingBuilder/customItem/UPDATE_CUSTOM_ITEM_TOTAL';
export const UPDATE_CUSTOM_ITEM_DESCRIPTION = 'bookingBuilder/customItem/UPDATE_CUSTOM_ITEM_DESCRIPTION';
export const UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN = 'bookingBuilder/customItem/UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN';
export const UPDATE_CUSTOM_ITEM_COUNTS_AS_TRANSFER = 'bookingBuilder/customItem/UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN';


export type ShowCustomItemFormAction = ReturnType<typeof showCustomItemFormAction>;
export const showCustomItemFormAction = () => ({
  type: SHOW_CUSTOM_ITEM_FORM as typeof SHOW_CUSTOM_ITEM_FORM
});

export type HideCustomItemFormAction = ReturnType<typeof hideCustomItemFormAction>;
export const hideCustomItemFormAction = () => ({
  type: HIDE_CUSTOM_ITEM_FORM as typeof HIDE_CUSTOM_ITEM_FORM
});

//------------------- edit ----------------------------------

export type UpdateCustomItemNameAction = ReturnType<typeof updateCustomItemNameAction>;
export const updateCustomItemNameAction = (value: string) => ({
  type: UPDATE_CUSTOM_ITEM_NAME as typeof UPDATE_CUSTOM_ITEM_NAME,
  value
});

export type UpdateCustomItemTotalAction = ReturnType<typeof updateCustomItemTotalAction>;
export const updateCustomItemTotalAction = (value: string) => ({
  type: UPDATE_CUSTOM_ITEM_TOTAL as typeof UPDATE_CUSTOM_ITEM_TOTAL,
  value
});

export type UpdateCustomItemDescriptionAction = ReturnType<typeof updateCustomItemDescriptionAction>;
export const updateCustomItemDescriptionAction = (value: string) => ({
  type: UPDATE_CUSTOM_ITEM_DESCRIPTION as typeof UPDATE_CUSTOM_ITEM_DESCRIPTION,
  value
});

export type UpdateCustomItemCountsAsMealPlanAction = ReturnType<typeof updateCustomItemCountsAsMealPlanAction>;
export const updateCustomItemCountsAsMealPlanAction = (value: boolean) => ({
  type: UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN as typeof UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN,
  value
});

export type UpdateCustomItemCountsAsTransferAction = ReturnType<typeof updateCustomItemCountsAsTransferAction>;
export const updateCustomItemCountsAsTransferAction = (value: boolean) => ({
  type: UPDATE_CUSTOM_ITEM_COUNTS_AS_TRANSFER as typeof UPDATE_CUSTOM_ITEM_COUNTS_AS_TRANSFER,
  value
});


export type CustomItemAction =
  | ShowCustomItemFormAction
  | HideCustomItemFormAction

  | UpdateCustomItemNameAction
  | UpdateCustomItemTotalAction
  | UpdateCustomItemDescriptionAction
  | UpdateCustomItemCountsAsMealPlanAction
  | UpdateCustomItemCountsAsTransferAction;
