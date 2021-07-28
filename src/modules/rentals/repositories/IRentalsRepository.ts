import Rental, { statusRentals } from '../typeorm/entities/Rental';

interface ICreateRentalsDTO {
  id?: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
}

interface IShowRentalsDTO extends ICreateRentalsDTO {
  status: statusRentals[];
}

interface IRentalsRepository {
  create(createCarDTO: ICreateRentalsDTO): Promise<Rental>;
  show(showCarDTO: IShowRentalsDTO): Promise<Rental[]>;
}

export {
  IRentalsRepository,
  ICreateRentalsDTO,
  IShowRentalsDTO,
  statusRentals,
};
