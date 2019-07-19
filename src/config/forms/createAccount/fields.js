import React, { Fragment } from 'react';
import { pick, prop, omit } from 'ramda';
import i18n from 'config/i18n';

import { RadioButton, Select } from 'components/elements';

import { arrayToKeyValueObject } from 'utils';

import formConfig from 'config/forms';
import countriesData from 'config/data/countries';
import promotedCountriesData from 'config/data/countries-promoted';

const keyValueCountries = arrayToKeyValueObject('code', 'name')(countriesData);
const promotedCountries = pick(promotedCountriesData, keyValueCountries);
const restCountries = omit(promotedCountriesData, keyValueCountries);

export default {
  title: {
    label: i18n.t('labels.title'),
    default: '',
    Component: Select,
    props: {
      options: prop('titles', formConfig),
    },
  },
  firstName: {
    label: i18n.t('labels.firstName'),
    default: '',
  },
  lastName: {
    label: i18n.t('labels.lastName'),
    default: '',
  },
  email: {
    label: i18n.t('labels.emailAddress'),
    default: '',
  },
  isExistingPartner: {
    label: i18n.t('labels.existingPartner'),
    default: 'false',
    Component: RadioButton,
    props: {
      options: [
        {
          label: i18n.t('labels.yes'),
          value: 'true',
        },
        {
          label: i18n.t('labels.no'),
          value: 'false',
        },
      ],
    },
  },
  companySignupInfo: {
    name: {
      label: i18n.t('labels.company.name'),
      default: '',
    },
    countryCode: {
      label: i18n.t('labels.company.country'),
      default: '',
      Component: Select,
      props: {
        options: [promotedCountries, restCountries],
      },
    },
  },
  phoneNumber: {
    label: i18n.t('labels.landline'),
    default: '',
  },
  mobileNumber: {
    label: i18n.t('labels.mobile'),
    default: '',
  },
  agreeToTerms: {
    label: (
      <Fragment>
        {i18n.t('labels.agreeTo')}
        <a href="/terms-and-conditions" target="_blank">
          {i18n.t('labels.termsAndConditions')}
        </a>
      </Fragment>
    ),
    default: false,
  },
};
