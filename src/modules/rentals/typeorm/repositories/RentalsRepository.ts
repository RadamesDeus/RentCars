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
  async save(rental: Rental): Promise<void> {
    await this.ormRepository.save(rental);
  }

  async findById(rental_id: string): Promise<Rental | undefined> {
    return this.ormRepository.findOne({ id: rental_id });
  }

  async create(createCarDTO: ICreateRentalsDTO): Promise<Rental> {
    const rental = this.ormRepository.create(createCarDTO);
    await this.ormRepository.save(rental);
    return rental;
  }

  async show(optionFilter: IShowRentalsDTO): Promise<Rental[]> {
    console.log('optionFilter', optionFilter);

    if (optionFilter.id) {
      return this.ormRepository.find({
        where: { id: optionFilter.id },
        relations: ['cars'],
      });
    }

    const rentalQuery = this.ormRepository
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.car', 'cars')
      .leftJoinAndSelect('rental.user', 'users');

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
    const list = await rentalQuery.getMany();
    return list;
  }
}
export default RentalsRepository;
