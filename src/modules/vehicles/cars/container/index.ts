import { container } from 'tsyringe';

import { ICarsRepository } from '../repositories/ICarsRepository';
import CarsRepository from '../typeorm/repositories/CarsRepository';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
