import { string } from 'yup';

import validators from 'config/forms/validators';

export default validators.shape({
  proposalId: validators.text(),
  proposalName: string().when('proposalId', { is: 'new', then: validators.text() }),
});
