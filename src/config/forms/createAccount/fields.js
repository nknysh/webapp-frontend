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
    label: 'Title',
    default: '',
    Component: Select,
    props: {
      options: prop('titles', formConfig),
    },
  },
  firstName: {
    label: 'First name',
    default: '',
  },
  lastName: {
    label: 'Last name',
    default: '',
  },
  email: {
    label: 'Email address',
    default: '',
  },
  isExistingPartner: {
    label: 'Are you an existing partner?',
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
      label: 'Company name',
      default: '',
    },
    countryCode: {
      label: 'Company country',
      default: '',
      Component: Select,
      props: {
        options: [promotedCountries, restCountries],
      },
    },
  },
  phoneNumber: {
    label: 'Landline',
    default: '',
  },
  mobileNumber: {
    label: 'Mobile',
    default: '',
  },
  agreeToTerms: {
    label: (
      <Fragment>
        I agree to the{' '}
        <a href="/terms-and-conditions" target="_blank">
          Terms and Conditions
        </a>
      </Fragment>
    ),
    default: false,
  },
};
