import { string } from 'yup';

import validators from '../validators';

export default validators.shape({
  proposalId: validators.text(),
  proposalName: string().when('proposalId', { is: 'new', then: validators.text() }),
});
