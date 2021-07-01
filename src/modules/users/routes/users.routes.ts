import UploadConfig from "@config/upload";
import UserAvatarController from "@modules/users/controllers/UserAvatarController";
import UsersController from "@modules/users/controllers/UsersController";
import ensureAuthenticated from "@modules/users/middlewares/ensureAuthenticated";
import { Router } from "express";
import multer from "multer";

// import { celebrate, Segments, Joi } from "celebrate";
const routes = Router();
const upload = multer(UploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post(
  "/",

  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),

  //     email: Joi.string().required().email(),

  //     password: Joi.string().required(),
  //   },
  // }),

  usersController.create
);

routes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default routes;
