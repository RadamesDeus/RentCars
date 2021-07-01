import { Router } from "express";

import CreateSpecificationsController from "../controllers/CreateSpecificationsController";
import ListSpecificationsController from "../controllers/ListSpecificationsController";

const routes = Router();
const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

routes.post("/", createSpecificationsController.create);
routes.get("/", listSpecificationsController.show);

export default routes;
