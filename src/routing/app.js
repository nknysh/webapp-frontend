import site from './routes/site';
import auth from './routes/auth';
import page from './routes/page';
import notFound from './routes/notFound';
import search from './routes/search';

export default [...site, ...search, ...auth, ...page, ...notFound];
