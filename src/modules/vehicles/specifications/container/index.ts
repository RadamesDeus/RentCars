import { container } from "tsyringe";

import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";
import SpecificationsRepository from "../typeorm/repositories/SpecificationsRepository";

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
