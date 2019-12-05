import React, { Component, HTMLProps } from 'react';

export interface IMousePosition {
  x: number;
  y: number;
  isOver: boolean;
}
export interface IMousePositionProviderProps extends HTMLProps<HTMLSpanElement> {
  render: (mousePosition: IMousePosition) => JSX.Element | JSX.Element[];
}

export default class MousePositionProvider extends Component<IMousePositionProviderProps, IMousePosition> {
  state = { x: 0, y: 0, isOver: false };

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  handleMouseOver = () => {
    this.setState({
      isOver: true,
    });
  };

  handleMouseOut = () => {
    this.setState({
      isOver: false,
    });
  };

  render() {
    return (
      <span
        className={this.props.className}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
      </span>
    );
  }
}
