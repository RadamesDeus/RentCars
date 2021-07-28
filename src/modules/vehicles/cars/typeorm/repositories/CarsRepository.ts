import {
  getRepository,
  IsNull,
  LessThan,
  Like,
  Not,
  Repository,
} from 'typeorm';

import {
  ICarsRepository,
  ICreateCarDTO,
  IListCarFilterDTO,
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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });
    await this.ormRepository.save(car);
    return car;
  }
  async findById(car_id: string): Promise<Car | undefined> {
    return this.ormRepository.findOne(car_id);
  }

  async list(optionFilter: IListCarFilterDTO): Promise<Car[]> {
    // return this.ormRepository.find({
    //   where: {
    //     ...optionFilter,
    //     description:
    //       (!optionFilter.description && (Not('') || IsNull())) ||
    //       Like(optionFilter.description),
    //   },
    // });

    if (optionFilter.id) {
      return this.ormRepository.find({ id: optionFilter.id });
    }

    const carsQuery = await this.ormRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.specification', 'specifications_cars')
      .where('car.available = :available', {
        available: optionFilter.available,
      });

    if (optionFilter.brand)
      carsQuery.andWhere('car.brand = :brand', {
        brand: optionFilter.brand,
      });

    if (optionFilter.category_id)
      carsQuery.andWhere('car.category_id = :category_id', {
        category_id: optionFilter.category_id,
      });

    if (optionFilter.description)
      carsQuery.andWhere('car.description like :description', {
        description: `%${optionFilter.description}% `,
      });

    if (optionFilter.license_plate)
      carsQuery.andWhere('car.license_plate like :license_plate', {
        license_plate: `% ${optionFilter.license_plate}% `,
      });

    return carsQuery.getMany();
  }

  findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.ormRepository.findOne({ where: { license_plate } });
  }
}
export default CarsRepository;
