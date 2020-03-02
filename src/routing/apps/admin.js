import { auth, booking, user, adminRedirect, proposals, offers } from 'routing/common';

export default [...auth, ...booking, ...user, ...proposals, ...offers, ...adminRedirect];
