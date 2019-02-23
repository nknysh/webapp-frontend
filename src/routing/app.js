import site from './routes/site';
import auth from './routes/auth';
import page from './routes/page';
import notFound from './routes/notFound';

export default [...site, ...auth, ...page, ...notFound];
