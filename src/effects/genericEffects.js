import { useEffect, useState, useCallback } from 'react';

/**
 * @see https://github.com/facebook/react/issues/14369
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

export const useModalState = (initialValue, initialContext) => {
  const [modalOpen, setModalOpen] = useState(initialValue);
  const [modalContext, setModalContext] = useState(initialContext);

  const onModalClose = useCallback(() => setModalOpen(false), []);
  const onModalOpen = useCallback(() => setModalOpen(true), []);

  return { modalOpen, onModalClose, onModalOpen, modalContext, setModalContext };
};
