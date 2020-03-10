import { auth, adminRedirect, user, offers } from 'routing/common';

export default [...auth, ...user, ...offers, ...adminRedirect];
