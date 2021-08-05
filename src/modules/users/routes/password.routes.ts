import RecoverPasswordController from '@modules/users/controllers/RecoverPasswordController';
// import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const routes = Router();

const recoverPasswordController = new RecoverPasswordController();

// const resetPasswordController = new ResetPasswordController();

routes.post(
  '/forgot',

  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
    },
  }),

  recoverPasswordController.create,
);

// routes.post(
//   '/reset',

//   // celebrate({
//   //   [Segments.BODY]: {
//   //     password: Joi.string().required(),

//   //     password_confirmation: Joi.string().required().valid(Joi.ref("password")),

//   //     token: Joi.string().required().uuid(),
//   //   },
//   // }),

//   resetPasswordController.create,
// );

export default routes;
