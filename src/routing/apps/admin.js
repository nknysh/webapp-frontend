import { auth, booking, user, adminRedirect } from 'routing/common';

export default [...auth, ...booking, ...user, ...adminRedirect];
