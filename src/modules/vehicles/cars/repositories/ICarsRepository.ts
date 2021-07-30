import Specification from '@modules/vehicles/specifications/typeorm/entities/Specification';

import Car from '../typeorm/entities/Car';

interface ICreateCarDTO {
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

interface IListCarFilterDTO {
  id: string;
  description: string;
  license_plate: string;
  brand: string;
  category_id: string;
  available: true;
}

interface ICarsRepository {
  create(createCarDTO: ICreateCarDTO): Promise<Car>;
  list(optionFilter: IListCarFilterDTO | undefined): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findById(car_id: string): Promise<Car | undefined>;
  save(car: Car): Promise<Car | undefined>;
}

export { ICarsRepository, ICreateCarDTO, IListCarFilterDTO };
