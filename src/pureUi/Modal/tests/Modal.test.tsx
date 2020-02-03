import React from 'react';
import { mount } from 'enzyme';
import { appendPortalElements } from '../../../utils/portals/index';
import {
  ModalWrapper,
  ModalFrame,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  StandardModal,
} from '../index';

describe('Modal', () => {
  let closeSpy;
  let subject;

  beforeEach(() => {
    closeSpy = jest.fn();
  });
  describe('Modal Components', () => {
    beforeAll(() => {
      subject = mount(
        <ModalWrapper>
          <ModalFrame>
            <ModalHeader>
              <p>Header</p>
            </ModalHeader>
            <ModalContent>
              <p>Content</p>
            </ModalContent>
            <ModalFooter>
              <p>Footer</p>
            </ModalFooter>
            <ModalCloseButton onClick={closeSpy} />
          </ModalFrame>
        </ModalWrapper>
      );
    });

    it('renders correctly', () => {
      expect(subject).toMatchSnapshot();
    });
  });

  describe('StandardModal', () => {
    beforeAll(() => {
      appendPortalElements();
      const mounted = mount(
        <StandardModal onClose={closeSpy}>
          <ModalHeader>
            <p>Header</p>
          </ModalHeader>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
          <ModalFooter>
            <p>Footer</p>
          </ModalFooter>
        </StandardModal>
      );
    });

    it('renders correctly', () => {
      expect(subject).toMatchSnapshot();
    });
  });
});
