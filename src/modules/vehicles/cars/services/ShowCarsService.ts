import { injectable, inject } from 'tsyringe';

import { ICarsRepository } from '../repositories/ICarsRepository';
import Car from '../typeorm/entities/Car';

@injectable()
class ShowCarService {
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
  ) {}
  async execute(): Promise<Car[]> {
    return this.carRepository.list();
  }
}

export default ShowCarService;
