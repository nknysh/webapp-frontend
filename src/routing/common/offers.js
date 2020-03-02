import { AsyncOffersView, AsyncOffersList } from 'pages/async';

export default [
  {
    name: 'Offer page',
    path: '/offers/:id',
    component: AsyncOffersView,
    auth: true,
  },
  {
    name: 'Offer list page',
    path: '/offers',
    component: AsyncOffersList,
    auth: true,
  },
];
