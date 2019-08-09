import { auth, booking, proposals, user, adminRedirect } from 'routing/common';

export default [...auth, ...booking, ...proposals, ...user, ...adminRedirect];
