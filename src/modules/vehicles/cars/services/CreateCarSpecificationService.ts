import { ISpecificationsRepository } from '@modules/vehicles/specifications/repositories/ISpecificationsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import { ICarsRepository } from '../repositories/ICarsRepository';
import Car from '../typeorm/entities/Car';

interface IRequest {
  car_id: string;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}
  public async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) throw new AppError('Não existe esse veiculo');

    const specifications = await this.specificationsRepository.findByIds(
      specification_id,
    );
    if (specifications) car.specification = specifications;

    return this.carsRepository.create(car);
  }
}
export default CreateCarSpecificationService;
