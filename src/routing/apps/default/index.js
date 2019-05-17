import auth from 'routing/common/auth';
import page from 'routing/common/page';
import notFound from 'routing/common/notFound';
import search from 'routing/common/search';

import hotels from './routes/hotels';
import site from './routes/site';

export default [...site, ...search, ...hotels, ...auth, ...page, ...notFound];
