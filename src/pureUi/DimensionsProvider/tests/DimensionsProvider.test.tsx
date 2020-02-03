import React from 'react';
import { act } from 'react-dom/test-utils';
import { DimensionsProvider } from '../index';
import { mount } from 'enzyme';

let dims;

describe('dimensions provider', () => {
  let subject;

  beforeAll(() => {
    subject = mount(
      <DimensionsProvider
        display="block"
        render={(dimensions, windowSize) => {
          dims = { dimensions, windowSize };
          return <p style={{ width: 10, height: 20 }}>Test</p>;
        }}
      />
    );
  });

  it('Renders  correctly', () => {
    expect(subject).toMatchSnapshot();
  });

  it('Provides dimensions', () => {
    expect(dims).toMatchSnapshot();
  });

  it('updates on resize', () => {
    act(() => {
      // Change the viewport to 500px.
      (global as any).innerWidth = 500;

      // Trigger the window resize event.
      (global as any).dispatchEvent(new Event('resize'));
    });
    expect(dims).toMatchSnapshot();
  });

  it('updates on scroll', () => {
    act(() => {
      (global as any).innerWidth = 300;
      (global as any).dispatchEvent(new Event('scroll'));
    });
    expect(dims).toMatchSnapshot();
  });
});
