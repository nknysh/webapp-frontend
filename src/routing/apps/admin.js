import { auth, booking, user, adminRedirect, proposals } from 'routing/common';

export default [...auth, ...booking, ...user, ...proposals, ...adminRedirect];
