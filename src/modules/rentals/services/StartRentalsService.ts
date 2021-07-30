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
class StartRentalsService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute(rental_id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);
    if (!rental) throw new AppError('the rental not found', 401);

    rental.status = statusRentals.Progress;
    await this.rentalsRepository.save(rental);

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) throw new AppError('the car not found', 401);

    car.available = false;

    await this.carsRepository.save(car);

    return rental;
  }
}

export default StartRentalsService;
