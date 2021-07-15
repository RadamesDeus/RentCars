import { Router } from 'express';

import Cars from '../cars/routes';
import Categories from '../categories/routes';
import Specifications from '../specifications/routes';

const routes = Router();

routes.use('/cars', Cars);
routes.use('/categories', Categories);
routes.use('/specifications', Specifications);

routes.get('/', (req, res) => {
  res.status(204).json();
});

export default routes;
