import RefreshTokenController from '@modules/users/controllers/RefreshTokenController';
import SessionsController from '@modules/users/controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const routes = Router();

const sessionsController = new SessionsController();
const refreshTokenController = new RefreshTokenController();

routes.post(
  '/sessions',

  celebrate({
    [Segments.BODY]: {
      email_username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),

  sessionsController.create,
);

routes.post(
  '/refresh-token',

  // celebrate({
  //   [Segments.BODY]: {
  //     email: Joi.string().required().email(),

  //     password: Joi.string().required(),
  //   },
  // }),

  refreshTokenController.create,
);

export default routes;
