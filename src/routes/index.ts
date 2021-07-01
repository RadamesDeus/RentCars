import { Router } from "express";

import users from "../modules/users/routes";
import Categories from "../modules/vehicles/categories/routes";
import Specifications from "../modules/vehicles/specifications/routes";

const routes = Router();

routes.use("/users", users);
routes.use("/categories", Categories);
routes.use("/specifications", Specifications);

routes.get("/", (req, res) => {
  res.status(204).json();
});

export default routes;
