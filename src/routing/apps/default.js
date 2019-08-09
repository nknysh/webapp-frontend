import { auth, page, notFound, search, proposals, booking, user, hotels, root } from 'routing/common';

export default [
  ...root,

  // Order is important here
  ...auth,
  ...search,
  ...hotels,
  ...proposals,
  ...booking,
  ...user,

  // Page is a catch all /:path
  ...page,
  ...notFound,
];
