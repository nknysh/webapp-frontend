import { useEffect, useState, useCallback } from 'react';

/**
 * useEffectBoundary
 *
 * Custom effect hook to handle cleanup issue
 *
 * @see https://github.com/facebook/react/issues/14369
 *
 * @param {Function} effect
 * @param {array} params
 */
export const useEffectBoundary = (effect, params = []) =>
  useEffect(
    () => {
      let didCancel = false;

      if (!didCancel) {
        effect();
      }

      return () => {
        didCancel = true;
      };
    },
    // eslint-disable-next-line
    params
  );

/**
 * useModalState
 *
 * Reusable state hook for common modal operations
 *
 * @param {boolean} initialValue
 * @param {string} initialContext
 * @returns {object}
 */
export const useModalState = (initialValue = false, initialContext = undefined) => {
  const [modalOpen, setModalOpen] = useState(initialValue);
  const [modalContext, setModalContext] = useState(initialContext);

  const onModalClose = useCallback(() => setModalOpen(false), []);
  const onModalOpen = useCallback(() => setModalOpen(true), []);

  return { modalOpen, onModalClose, onModalOpen, modalContext, setModalContext };
};
