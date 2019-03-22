import site from './routes/site';
import auth from './routes/auth';
import page from './routes/page';
import notFound from './routes/notFound';
import search from './routes/search';
import hotels from './routes/hotels';

export default [...site, ...search, ...hotels, ...auth, ...page, ...notFound];
