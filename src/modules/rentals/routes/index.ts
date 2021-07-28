import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CreateRentalsController from '../controllers/CreateRentalsController';

const routes = Router();
const createRentalsController = new CreateRentalsController();

routes.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      car_id: Joi.string().uuid(),
      start_date: Joi.date(),
      expected_return_date: Joi.date(),
    }),
  }),
  createRentalsController.create,
);

export default routes;
