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

  async show(optionFilter?: IShowRentalsDTO): Promise<Rental[]> {
    return this.ormRepository.find({ where: { ...optionFilter } });
  }
}
export default RentalsRepository;
