import ensureAdmin from '@modules/users/middlewares/ensureAdmin';
import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';

import UploadConfig from '../../../../config/upload';
import CreateCategoriesController from '../controllers/CreateCategoriesController';
import CreateCategoriesFileController from '../controllers/CreateCategoriesFileController';
import ListCategoriesController from '../controllers/ListCategoriesController';

const routes = Router();
const createCategoriesController = new CreateCategoriesController();
const createCategoriesFileController = new CreateCategoriesFileController();
const listCategoriesController = new ListCategoriesController();

const upload = multer(UploadConfig);

routes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoriesController.create,
);

routes.patch(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  createCategoriesFileController.create,
);

routes.get('/', listCategoriesController.show);
export default routes;
