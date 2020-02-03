import React from 'react';
import { act } from 'react-dom/test-utils';
import { IViewportDimensions } from 'hooks/useWindowSize/index';
import { IDimensions } from 'pureUi/DimensionsProvider/index';
import { mount } from 'enzyme';
import { AutoPosition } from '../index';

const viewportDims: IViewportDimensions = {
  width: 100,
  height: 200,
};

const dims: IDimensions = {
  width: 80,
  height: 180,
  top: 10,
  left: 10,
  bottom: 10,
  right: 10,
};

describe('<AutoPosition />', () => {
  let subject;
  beforeEach(() => {
    subject = mount(
      <AutoPosition viewportDimensions={viewportDims} ancestorDimensions={dims}>
        <p>Test</p>
      </AutoPosition>
    );
  });

  it('matches the snapshot', () => {
    expect(subject).toMatchSnapshot();
  });

  // TODO: figure out how to actually test this.
  // it('set styles correctly', done => {
  //   act(() => {
  //     setTimeout(() => {
  //       const style = subject.getDOMNode();
  //       done();
  //       expect(style).toMatchSnapshot();
  //     });
  //   });
  // });
});
