import {
  ICreateRentalsDTO,
  IRentalsRepository,
  IShowRentalsDTO,
} from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';

import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async create(createCarDTO: ICreateRentalsDTO): Promise<Rental> {
    const rental = this.ormRepository.create(createCarDTO);
    await this.ormRepository.save(rental);
    return rental;
  }

  async show(optionFilter: IShowRentalsDTO): Promise<Rental[]> {
    /*
    id?: string;
    car_id: string;
    user_id: string;
    start_date: Date;
    expected_return_date: Date;
    status: statusRentals[];
    */

    if (optionFilter.id) {
      return this.ormRepository.find({ id: optionFilter.id });
    }

    const rentalQuery = this.ormRepository.createQueryBuilder('rental');

    if (optionFilter?.status)
      rentalQuery.andWhere('rental.status IN (:...status)', {
        status: optionFilter.status,
      });

    if (optionFilter.user_id)
      rentalQuery.andWhere('rental.user_id = :user_id', {
        user_id: optionFilter.user_id,
      });

    if (optionFilter.car_id)
      rentalQuery.andWhere('rental.car_id = :car_id', {
        car_id: optionFilter.car_id,
      });

    if (optionFilter.start_date)
      rentalQuery.andWhere('rental.start_date = :start_date', {
        start_date: optionFilter.start_date,
      });

    if (optionFilter.expected_return_date)
      rentalQuery.andWhere(
        'rental.expected_return_date = :expected_return_date',
        {
          expected_return_date: optionFilter.expected_return_date,
        },
      );

    return rentalQuery.getMany();
  }
}
export default RentalsRepository;
