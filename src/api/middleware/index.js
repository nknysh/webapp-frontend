import authMiddleware from './authMiddleware';
import headerMiddleware from './headerMiddleware';

const middlewares = {
  request: [authMiddleware, headerMiddleware],
  response: [],
};

export default middlewares;
