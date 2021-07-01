import { Router } from "express";
import multer from "multer";

import UploadConfig from "../../../../config/upload";
import CreateCategoriesController from "../controllers/CreateCategoriesController";
import CreateCategoriesFileController from "../controllers/CreateCategoriesFileController";
import ListCategoriesController from "../controllers/ListCategoriesController";

const routes = Router();
const createCategoriesController = new CreateCategoriesController();
const createCategoriesFileController = new CreateCategoriesFileController();
const listCategoriesController = new ListCategoriesController();

const upload = multer(UploadConfig);

routes.post("/", createCategoriesController.create);
routes.get("/", listCategoriesController.show);

routes.patch(
  "/import",
  upload.single("file"),
  createCategoriesFileController.create
);

export default routes;
