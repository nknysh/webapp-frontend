export const UI_ENQUEUE_NOTIFICATION = 'UI_ENQUEUE_NOTIFICATION';
export const UI_REMOVE_NOTIFICATION = 'UI_REMOVE_NOTIFICATION';
export const SET_IS_BOOKING_SUMMARY_SECTION_COLLAPSED = 'SET_IS_BOOKING_SUMMARY_SECTION_COLLAPSED';

/**
 * Enqueue notification action
 *
 * @param {object} notification
 * @returns {object}
 */
export const enqueueNotification = notification => ({
  type: UI_ENQUEUE_NOTIFICATION,
  payload: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

/**
 * Remove notification
 *
 * @param {object} payload
 * @returns {object}
 */
export const removeNotification = payload => ({
  type: UI_REMOVE_NOTIFICATION,
  payload,
});

export const setIsBookingSummarySectionCollapsed = payload => {
  return {
    type: SET_IS_BOOKING_SUMMARY_SECTION_COLLAPSED,
    payload,
  };
};
