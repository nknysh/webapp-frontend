import { HotelsSearch, HotelView } from 'pages';

export default [
  {
    name: 'Hotels Search Path',
    path: '/hotels',
    auth: true,
    component: HotelsSearch,
  },
  {
    name: 'Hotel View Path',
    path: '/hotels/:id',
    auth: true,
    component: HotelView,
  },
];
