import { Router } from 'express';

import CreateCategoriesController from '../controllers/CreateCarController';
import ListCarController from '../controllers/ListCarController';

const routes = Router();
const createCategoriesController = new CreateCategoriesController();
const listCategoriesController = new ListCarController();

routes.post('/', createCategoriesController.create);
routes.get('/', listCategoriesController.show);

export default routes;
