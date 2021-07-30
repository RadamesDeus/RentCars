import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CreateRentalsController from '../controllers/CreateRentalsController';
import EndRentalsController from '../controllers/EndRentalsController';
import StartRentalsController from '../controllers/StartRentalsController';

const routes = Router();
const createRentalsController = new CreateRentalsController();
const startRentalsController = new StartRentalsController();
const endRentalsController = new EndRentalsController();

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

routes.post(
  '/start/:rental_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      rental_id: Joi.string().required().uuid(),
    }),
  }),
  startRentalsController.update,
);

routes.post(
  '/end/:rental_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      rental_id: Joi.string().required().uuid(),
    }),
  }),
  endRentalsController.update,
);

export default routes;
