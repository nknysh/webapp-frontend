import React, { Fragment } from 'react';

import { Link } from 'styles/elements';

export default {
  labels: {
    title: 'Title',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email address',
    existingPartner: 'Are you an existing partner?',
    companyId: 'Company ID',
    companyName: 'Company name',
    companyCountry: 'Company country',
    landline: 'Landline',
    mobile: 'Mobile',
    agreeToTerms: (
      <Fragment>
        I agree to the{' '}
        <a href="/terms-and-conditions" target="_blank">
          Terms and Conditions
        </a>
      </Fragment>
    ),
  },
  defaults: {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    existingPartner: 'true',
    companyId: '',
    companyName: '',
    companyCountry: '',
    landline: '',
    mobile: '',
    agreeToTerms: 'false',
  },
};
