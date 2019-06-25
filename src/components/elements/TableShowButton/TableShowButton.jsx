import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { prop } from 'ramda';

import { ShowButton } from './TableShowButton.styles';

export const TableShowButton = ({ record, source, basePath, external }) => {
  const { t } = useTranslation();

  const path = `${basePath}/${prop(source, record)}`;

  const props = {
    to: !external && path,
    href: external && path,
  };

  return (
    <ShowButton inverse {...props}>
      {t('labels.details')}
    </ShowButton>
  );
};

TableShowButton.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string,
  basePath: PropTypes.string,
  external: PropTypes.bool,
};
TableShowButton.defaultProps = {
  basePath: '',
};

export default TableShowButton;
