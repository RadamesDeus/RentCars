import 'reflect-metadata';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/vehicles/cars/repositories/ICarsRepository';
import moment from 'moment';
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import {
  ICreateRentalsDTO,
  IRentalsRepository,
  IShowRentalsDTO,
  statusRentals,
} from '../repositories/IRentalsRepository';
import Rental from '../typeorm/entities/Rental';

// import Category from '../typeorm/entities/Category';

interface IRequet {
  car_id: string;
  user_id: string;
  start_date: Date;
  status: string;
}

@injectable()
class CreateRentalsService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async execute(createRentalsDTO: ICreateRentalsDTO): Promise<Rental> {
    const { car_id, user_id, start_date, expected_return_date } =
      createRentalsDTO;
    const car = await this.carsRepository.findById(car_id);
    if (!car) throw new AppError('the car not found', 401);
    if (!car.available) throw new AppError('The not available', 401);

    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('the user not found', 401);

    const rentaslExists = await this.rentalsRepository.show({
      car_id,
      user_id,
      status: [
        statusRentals.Scheduled,
        statusRentals.Confirmed,
        statusRentals.Progress,
      ],
    } as IShowRentalsDTO);

    const rentalsfinds = rentaslExists.filter(
      rental =>
        (moment(start_date) >= moment(rental.start_date) &&
          moment(start_date) < moment(rental.expected_return_date)) ||
        (moment(expected_return_date) >= moment(rental.start_date) &&
          moment(expected_return_date) < moment(rental.expected_return_date)),
    );

    if (rentalsfinds.length)
      throw new AppError('Exist a rental for this car and user', 401);

    if (moment(expected_return_date) < moment(start_date).add(24, 'h'))
      throw new AppError("Don't permit rent of less 24h', 401");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      start_date: moment(start_date).toDate(),
      expected_return_date: moment(expected_return_date).toDate(),
    });
    return rental;
  }
}

export default CreateRentalsService;
