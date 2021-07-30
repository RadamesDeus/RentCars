import { v4 as uuidv4 } from 'uuid';

import Rental from '../../typeorm/entities/Rental';
import {
  ICreateRentalsDTO,
  IRentalsRepository,
  IShowRentalsDTO,
  statusRentals,
} from '../IRentalsRepository';

class FakeRentalsRepository implements IRentalsRepository {
  private Rentals: Rental[] = [];
  async save(rental: Rental): Promise<void> {
    const index = this.Rentals.findIndex(obj => obj.id === rental.id);
    this.Rentals[index] = rental;
  }

  async findById(rental_id: string): Promise<Rental> {
    const index = this.Rentals.findIndex(obj => obj.id === rental_id);
    return this.Rentals[index];
  }

  public async create(createRentalsDTO: ICreateRentalsDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      ...createRentalsDTO,
      id: !createRentalsDTO.id ? uuidv4() : createRentalsDTO.id,
      status: statusRentals.Scheduled,
    });

    if (createRentalsDTO.id) {
      const index = this.Rentals.findIndex(
        obj => obj.id === createRentalsDTO.id,
      );
      this.Rentals[index] = rental;
      return rental;
    }

    this.Rentals.push(rental);
    return rental;
  }

  public async show(optinFilter: IShowRentalsDTO): Promise<Rental[]> {
    return this.Rentals.filter(
      item =>
        // (!optinFilter.id || item.id === optinFilter.id) &&
        // (!optinFilter.car_id || item.car_id === optinFilter.car_id) &&
        !optinFilter.user_id || item.user_id === optinFilter.user_id, // &&
      // (!optinFilter.start_date ||
      //   item.start_date >= optinFilter.start_date) &&
      // (!optinFilter.status ||
      //   optinFilter.status.find(s => s === item.status)) &&
      // (!optinFilter.expected_return_date ||
      //   item.expected_return_date <= optinFilter.expected_return_date),
    );
  }
}

export default FakeRentalsRepository;
