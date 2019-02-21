import { About, Calendar, Contact, Home, HotelsSearch, HotelView, Privacy, Terms } from 'pages';

export default [
  {
    name: 'Root Path',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    name: 'About Path',
    path: '/about',
    component: About,
  },
  {
    name: 'Contact Path',
    path: '/contact',
    component: Contact,
  },
  {
    name: 'Privacy Path',
    path: '/privacy',
    component: Privacy,
  },
  {
    name: 'Terms Path',
    path: '/terms',
    component: Terms,
  },
  {
    name: 'Calendar Path',
    path: '/calendar',
    auth: true,
    component: Calendar,
  },
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
