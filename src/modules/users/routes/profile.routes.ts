import UserProfileController from "@modules/users/controllers/UserProfileController";
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";
// import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

const routes = Router();

const userProfileController = new UserProfileController();

//  name, email, oldpassword, password

routes.get("/profile", ensureAuthenticated, userProfileController.show);

routes.put(
  "/profile",

  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),

  //     email: Joi.string().required().email(),

  //     password: Joi.string(),

  //     password_confirmation: Joi.string().valid(Joi.ref("password")),

  //     oldpassword: Joi.string(),
  //   },
  // }),

  ensureAuthenticated,

  userProfileController.update
);

export default routes;
