import { container } from "tsyringe";

import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import CategoriesRepository from "../typeorm/repositories/CategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
