import { container } from 'tsyringe';

import { ICarsImageRepository } from '../repositories/ICarsImageRepository';
import { ICarsRepository } from '../repositories/ICarsRepository';
import CarsImageRepository from '../typeorm/repositories/CarsImageRepository';
import CarsRepository from '../typeorm/repositories/CarsRepository';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository,
);
