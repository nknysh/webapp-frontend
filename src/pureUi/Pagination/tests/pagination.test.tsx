import React from 'react';
import { Pagination, getStartIdex } from '../';
import { shallow, mount } from 'enzyme';
import { act, Simulate } from 'react-dom/test-utils';
import { PaginationButton } from '../index';

describe('getStartIdex', () => {
  it('calculates the correct start index', () => {
    expect(getStartIdex(0, 100, 10)).toEqual(0);
    expect(getStartIdex(100, 100, 10)).toEqual(90);
    expect(getStartIdex(55, 100, 10)).toEqual(49);
  });
});

describe('<Pagination />', () => {
  let subject;
  let pageSelectSpy = jest.fn((pageNumber: number) => {});

  beforeEach(() => {
    subject = mount(<Pagination currentPage={55} pageCount={100} onPageSelect={pageSelectSpy} />);
  });

  describe('prev button', () => {
    it('enables the prev button correctly', () => {
      const prevButton = subject.find('[data-role="prev page button"]').last();
      expect(prevButton.props().disabled).toBe(false);
    });

    it('calls `onPageSelect` corrctly', () => {
      const prevButton = subject.find('[data-role="prev page button"]').last();
      prevButton.simulate('click');
      expect(pageSelectSpy).toHaveBeenCalledWith(54);
    });

    it('disables the prev button correctly', () => {
      const bespokeSubject = mount(<Pagination currentPage={1} pageCount={100} onPageSelect={pageSelectSpy} />);
      const prevButton = bespokeSubject.find('[data-role="prev page button"]').last();
      expect(prevButton.props().disabled).toBe(true);
    });
  });

  describe('next button', () => {
    it('enables the next button correctly', () => {
      const nextButton = subject.find('[data-role="next page button"]').last();
      expect(nextButton.props().disabled).toBe(false);
    });

    it('calls `onPageSelect` corrctly', () => {
      const nextButton = subject.find('[data-role="next page button"]').last();
      nextButton.simulate('click');
      expect(pageSelectSpy).toHaveBeenCalledWith(56);
    });

    it('disables the next button correctly', () => {
      const bespokeSubject = mount(<Pagination currentPage={100} pageCount={100} onPageSelect={pageSelectSpy} />);
      const nextButton = bespokeSubject.find('[data-role="next page button"]').last();
      expect(nextButton.props().disabled).toBe(true);
    });
  });
});
