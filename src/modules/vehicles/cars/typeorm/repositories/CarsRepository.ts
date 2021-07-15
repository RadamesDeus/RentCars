import { getRepository, Repository } from 'typeorm';

import {
  ICarsRepository,
  ICreateCarDTO,
} from '../../repositories/ICarsRepository';
import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async create({
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    await this.ormRepository.save(car);
    return car;
  }

  list(): Promise<Car[]> {
    return this.ormRepository.find();
  }

  findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.ormRepository.findOne({ where: { license_plate } });
  }
}
export default CarsRepository;
