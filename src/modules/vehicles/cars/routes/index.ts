import UploadConfig from '@config/upload';
import ensureAdmin from '@modules/users/middlewares/ensureAdmin';
import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import CreateCategoriesController from '../controllers/CreateCarController';
import CreateCarImageController from '../controllers/CreateCarImageController';
import CreateCarSpecificationController from '../controllers/CreateCarSpecificationController';
import ListCarController from '../controllers/ListCarController';

const routes = Router();
const upload = multer(UploadConfig);
const createCategoriesController = new CreateCategoriesController();
const createCarSpecificationController = new CreateCarSpecificationController();
const createCarImageController = new CreateCarImageController();
const listCategoriesController = new ListCarController();

routes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoriesController.create,
);

routes.post(
  '/specifications/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      car_id: Joi.string().required().uuid(),
    }),
    [Segments.BODY]: Joi.object().keys({
      specification_ids: Joi.array().items(Joi.string().uuid()).min(1),
    }),
  }),
  createCarSpecificationController.create,
);

routes.patch(
  '/images/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      car_id: Joi.string().required().uuid(),
    }),
  }),
  upload.array('images'),
  createCarImageController.create,
);

routes.get(
  '/filter',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string(),
      description: Joi.string(),
      license_plate: Joi.string(),
      brand: Joi.string(),
      category_id: Joi.string().uuid(),
      available: Joi.boolean().required(),
    },
  }),
  listCategoriesController.show,
);

export default routes;
