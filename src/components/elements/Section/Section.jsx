import React from 'react';
import PropTypes from 'prop-types';

import { StyledSection, SectionLabel } from './Section.styles';

export const Section = ({ label, children }) => (
  <StyledSection>
    {label && <SectionLabel>{label}</SectionLabel>}
    {children}
  </StyledSection>
);

Section.propTypes = {
  label: PropTypes.label,
  children: PropTypes.any,
};

export default Section;
