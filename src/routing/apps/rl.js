import { auth, adminRedirect, user } from 'routing/common';

export default [...auth, ...user, ...adminRedirect];
