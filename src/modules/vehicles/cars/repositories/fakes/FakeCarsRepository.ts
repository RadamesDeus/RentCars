import Car from '../../typeorm/entities/Car';
import { ICarsRepository, ICreateCarDTO } from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    throw new Error('Method not implemented.');
  }
  create({
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<Car[]> {
    throw new Error('Method not implemented.');
  }
}

export default FakeCarsRepository;
