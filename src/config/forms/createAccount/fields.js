import React, { Fragment } from 'react';
import { path, pick, prop, omit } from 'ramda';

import RadioButton from 'components/RadioButton';
import Select from 'components/Select';

import { arrayToKeyValueObject } from 'utils';

import uiConfig from 'config/ui';
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
          label: path(['labels', 'yes'], uiConfig),
          value: 'true',
        },
        {
          label: path(['labels', 'no'], uiConfig),
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
    country: {
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
