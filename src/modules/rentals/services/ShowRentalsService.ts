import AppError from '@errors/AppError';

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import {
  IRentalsRepository,
  IShowRentalsDTO,
} from '../repositories/IRentalsRepository';
import Rental from '../typeorm/entities/Rental';

@injectable()
class ShowRentalsService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  public async execute(showRentalsDTO: IShowRentalsDTO): Promise<Rental[]> {
    if (!Object.keys(showRentalsDTO).length)
      throw new AppError('not exists one filter start date', 401);
    const rentaslExists = await this.rentalsRepository.show(showRentalsDTO);

    return rentaslExists;
  }
}

export default ShowRentalsService;
