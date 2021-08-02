import SessionsController from '@modules/users/controllers/SessionsController';
// import { celebrate, Segments, Joi } from "celebrate";
import { Router } from 'express';

const routes = Router();

const sessionsController = new SessionsController();

routes.post(
  '/sessions',

  // celebrate({
  //   [Segments.BODY]: {
  //     email: Joi.string().required().email(),

  //     password: Joi.string().required(),
  //   },
  // }),

  sessionsController.create,
);

export default routes;
