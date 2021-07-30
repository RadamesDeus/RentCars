import { v4 as uuidv4 } from 'uuid';

import Car from '../../typeorm/entities/Car';
import {
  ICarsRepository,
  ICreateCarDTO,
  IListCarFilterDTO,
} from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  public async save(car: Car): Promise<Car | undefined> {
    const index = this.Cars.findIndex(obj => obj.id === car.id);
    this.Cars[index] = car;
    return car;
  }
  private Cars: Car[] = [];

  public async create({
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: !id ? uuidv4() : id,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      available: true,
    });

    if (id) {
      const index = this.Cars.findIndex(obj => obj.id === id);
      this.Cars[index] = car;
      return car;
    }

    this.Cars.push(car);
    return car;
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    return this.Cars.find(item => item.license_plate === license_plate);
  }

  public async list(optinFilter: IListCarFilterDTO): Promise<Car[]> {
    return this.Cars.filter(
      item =>
        (!optinFilter.license_plate ||
          item.license_plate === optinFilter.license_plate) &&
        (!optinFilter.available || item.available === optinFilter.available) &&
        (!optinFilter.description ||
          item.description === optinFilter.description) &&
        (!optinFilter.brand || item.brand === optinFilter.brand) &&
        (!optinFilter.category_id ||
          item.category_id === optinFilter.category_id),
    );
  }

  public async findById(car_id: string): Promise<Car | undefined> {
    return this.Cars.find(item => item.id === car_id);
  }
}

export default FakeCarsRepository;
