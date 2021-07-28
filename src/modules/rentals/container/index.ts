import { container } from 'tsyringe';

import { IRentalsRepository } from '../repositories/IRentalsRepository';
import RentalsRepository from '../typeorm/repositories/RentalsRepository';

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
