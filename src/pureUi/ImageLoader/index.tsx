import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export type ImageAspectRatio = '4:3' | '16:9' | '11:7';

export interface ImageLoaderProps extends React.HTMLProps<HTMLImageElement> {
  aspectRatio: ImageAspectRatio;
  src: string;
  children: any;
}

const ImageLoader = (props: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setFailed(true);
      setIsLoading(false);
    };

    img.src = props.src;
  }, []);

  const { src, aspectRatio, children, ...otherProps } = props;
  return (
    <div className={props.className} {...otherProps}>
      {isLoading && <p className="overlay">Loading</p>}
      {failed && <p className="overlay">No image</p>}
      {children && <div className="children">{children}</div>}
    </div>
  );
};

const getPaddingForAspectRatio = (aspectRatio: ImageAspectRatio) => {
  switch (aspectRatio) {
    case '16:9':
      return '56.25%';
    case '11:7':
      return '66.96%';
    case '4:3':
    default:
      return '75%';
  }
};

export default styled(ImageLoader)`
  position: relative;
  height: 100px;
  padding-bottom: ${(props: ImageLoaderProps) => getPaddingForAspectRatio(props.aspectRatio)};
  background-image: url(${(props: ImageLoaderProps) => props.src});
  background-size: cover;
  user-select: none;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .children {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
