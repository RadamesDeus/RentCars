import { Router } from 'express';

import rentals from '../modules/rentals/routes';
import users from '../modules/users/routes';
import vehicles from '../modules/vehicles/routes';

const routes = Router();

routes.use('/users', users);
routes.use('/rentals', rentals);
routes.use(vehicles);

routes.get('/', (req, res) => {
  res.status(204).json();
});

export default routes;
