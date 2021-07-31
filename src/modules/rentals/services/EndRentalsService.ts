import 'reflect-metadata';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/vehicles/cars/repositories/ICarsRepository';
import moment from 'moment';
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import {
  IRentalsRepository,
  IShowRentalsDTO,
  statusRentals,
} from '../repositories/IRentalsRepository';
import Rental from '../typeorm/entities/Rental';

@injectable()
class EndRentalsService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async execute(rental_id: string): Promise<Rental> {
    const minimum_daily = 1;

    const rental = await this.rentalsRepository.findById(rental_id);
    if (!rental) throw new AppError('the rental not found', 401);

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) throw new AppError('the car not found', 401);

    const now = moment();
    const start_date = moment(rental.start_date);
    const return_date = moment(rental.expected_return_date);
    let daily = start_date.diff(now, 'days');
    const dalay = return_date.diff(now, 'days');

    let calcule_dalay = 0;
    let total = 0;

    if (daily <= 0) daily = minimum_daily;
    if (dalay > 0) calcule_dalay = dalay * car.fine_amount;

    total += calcule_dalay;
    total += daily * car.daily_rate;

    rental.total = total;
    rental.end_date = now.toDate();
    rental.status = statusRentals.Finished;

    await this.rentalsRepository.save(rental);

    car.available = true;
    await this.carsRepository.save(car);

    return rental;
  }
}

export default EndRentalsService;
