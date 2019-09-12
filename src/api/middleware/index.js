import authMiddleware from './authMiddleware';
import headerMiddleware from './headerMiddleware';

// List of middlewares by type.  Axios accepts request and response middlewares
const middlewares = {
  request: [authMiddleware, headerMiddleware],
  response: [],
};

export default middlewares;
