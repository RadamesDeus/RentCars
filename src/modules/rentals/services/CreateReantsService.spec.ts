import FakeRentalsRepository from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import HashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import FakeCarsRepository from '@modules/vehicles/cars/repositories/fakes/FakeCarsRepository';
import CreateCarService from '@modules/vehicles/cars/services/CreateCarService';
import moment from 'moment';

import AppError from '@errors/AppError';

import generete from '../../../ultis/genereteText';
import CreateRentalsService from './CreateRentalsService';

const fakeCarsRepository = new FakeCarsRepository();
const createCarService = new CreateCarService(fakeCarsRepository);

const fakeUsersRepository = new FakeUsersRepository();
const hashPassword = new HashPassword();
const createUsersServices = new CreateUsersServices(
  fakeUsersRepository,
  hashPassword,
);

const fakeRentalsRepository = new FakeRentalsRepository();
const createRentalsService = new CreateRentalsService(
  fakeRentalsRepository,
  fakeCarsRepository,
  fakeUsersRepository,
);

describe('Create Rentals', () => {
  it('should be able to create a new renatl', async () => {
    const user = await createUsersServices.execute({
      name: generete(),
      username: generete(),
      email: `${generete()}@test.com`,
      password: generete(),
      driver_license: 'A',
    });

    const car = await createCarService.execute({
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    });

    const renatal = await createRentalsService.execute({
      car_id: car.id,
      user_id: user.id,
      start_date: moment('2021-07-30').toDate(),
      expected_return_date: moment('2021-07-31').toDate(),
    });

    expect(renatal).toHaveProperty('id');
  });

  it('should not be able to create  a rental with less 24h', async () => {
    const user = await createUsersServices.execute({
      name: generete(),
      username: generete(),
      email: `${generete()}@test.com`,
      password: generete(),
      driver_license: 'A',
    });

    const car = await createCarService.execute({
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    });

    const renatal = await createRentalsService.execute({
      car_id: car.id,
      user_id: user.id,
      start_date: moment('2021-07-30').toDate(),
      expected_return_date: moment('2021-07-31').toDate(),
    });

    expect(renatal).toHaveProperty('id');
  });

  it('should not be able to create  a rental with a existed', async () => {
    const user = await createUsersServices.execute({
      name: generete(),
      username: generete(),
      email: `${generete()}@test.com`,
      password: generete(),
      driver_license: 'A',
    });

    const car = await createCarService.execute({
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    });

    expect(
      await createRentalsService.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: moment('2021-07-30').toDate(),
        expected_return_date: moment('2021-08-02').toDate(),
      }),
    ).toHaveProperty('id');

    await expect(
      createRentalsService.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: moment('2021-07-31').toDate(),
        expected_return_date: moment('2021-08-01').toDate(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
