import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CreateRentalsController from '../controllers/CreateRentalsController';
import EndRentalsController from '../controllers/EndRentalsController';
import ShowRentalsController from '../controllers/ShowRentalsController';
import StartRentalsController from '../controllers/StartRentalsController';
import { statusRentals } from '../repositories/IRentalsRepository';

const routes = Router();
const createRentalsController = new CreateRentalsController();
const startRentalsController = new StartRentalsController();
const endRentalsController = new EndRentalsController();
const showRentalsController = new ShowRentalsController();

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

routes.put(
  '/start/:rental_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      rental_id: Joi.string().required().uuid(),
    }),
  }),
  startRentalsController.update,
);

routes.put(
  '/end/:rental_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      rental_id: Joi.string().required().uuid(),
    }),
  }),
  endRentalsController.update,
);

routes.get(
  '/filter',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      car_id: Joi.string().uuid(),
      user_id: Joi.string().uuid(),
      start_date: Joi.date(),
      expected_return_date: Joi.date(),
      status: Joi.array().items(Joi.string().valid(statusRentals)),
    },
  }),
  showRentalsController.show,
);

export default routes;
