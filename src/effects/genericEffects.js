import { useEffect, useState } from 'react';

/**
 * @see https://github.com/facebook/react/issues/14369
 */
export const useEffectBoundary = (effect, params) =>
  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      effect();
    }

    return () => {
      didCancel = true;
    };
  }, params);

export const useModalState = (initialValue, initialContext) => {
  const [modalOpen, setModalOpen] = useState(initialValue);
  const [modalContext, setModalContext] = useState(initialContext);

  const onModalClose = () => setModalOpen(false);
  const onModalOpen = () => setModalOpen(true);

  return { modalOpen, onModalClose, onModalOpen, modalContext, setModalContext };
};
