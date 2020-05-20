import React from 'react';
import styled  from 'styled-components';

const DeprecatedAppBannerComponent = () =>  (
  <div>
    This version of app is deprecated. In order to avoid getting errors, please, reload page to get the latest version.
  </div>
);

const DeprecatedAppBanner = styled(DeprecatedAppBannerComponent)`
  width: 100%;
  background-color: yellow;
`;

export default DeprecatedAppBanner;
