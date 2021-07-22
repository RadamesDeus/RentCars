import { injectable, inject } from 'tsyringe';

import {
  ICarsRepository,
  IListCarFilterDTO,
} from '../repositories/ICarsRepository';
import Car from '../typeorm/entities/Car';

@injectable()
class ShowCarService {
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository,
  ) {}
  async execute(optionFilter: IListCarFilterDTO): Promise<Car[]> {
    return this.carRepository.list(optionFilter);
  }
}

export default ShowCarService;
