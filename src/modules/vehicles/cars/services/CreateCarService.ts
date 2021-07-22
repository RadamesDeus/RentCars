import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import { ICarsRepository } from '../repositories/ICarsRepository';
import Car from '../typeorm/entities/Car';

// import Category from '../typeorm/entities/Category';

interface IRequet {
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  public async execute({
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequet): Promise<Car> {
    if (await this.carsRepository.findByLicensePlate(license_plate)) {
      throw new AppError('Já Existe esse veiculo');
    }
    const car = await this.carsRepository.create({
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    return car;
  }
}

export default CreateCarService;
