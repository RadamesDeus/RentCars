import Car from '../typeorm/entities/Car';

interface ICreateCarDTO {
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarsRepository {
  create({
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car>;
  list(): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository, ICreateCarDTO };
