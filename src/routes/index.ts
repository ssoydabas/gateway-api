import express from 'express';
import accountRoute from './accountRoute';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/accounts',
    route: accountRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
