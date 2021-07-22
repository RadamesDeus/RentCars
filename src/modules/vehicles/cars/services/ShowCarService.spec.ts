import generete from '../../../../ultis/genereteText';
import FakeUsersRepository from '../repositories/fakes/FakeCarsRepository';
import { IListCarFilterDTO } from '../repositories/ICarsRepository';
import Car from '../typeorm/entities/Car';
import CreateCarService from './CreateCarService';
import ShowCarsService from './ShowCarsService';

const fakeUsersRepository = new FakeUsersRepository();
const createCarService = new CreateCarService(fakeUsersRepository);
const showCarsService = new ShowCarsService(fakeUsersRepository);

describe('List Category', () => {
  let car = new Car();
  beforeEach(async () => {
    await createCarService.execute({
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    });

    car = await createCarService.execute({
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    });

    await createCarService.execute({
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    });
  });

  it('should be able list cars', async () => {
    expect(
      await showCarsService.execute({
        available: true,
      } as IListCarFilterDTO),
    ).toHaveLength(3);
  });

  it('should be not able list filter cars', async () => {
    expect(
      await showCarsService.execute({
        available: true,
        brand: 'teste',
      } as IListCarFilterDTO),
    ).toHaveLength(0);
  });

  it('should be able list filter cars by brand', async () => {
    expect(
      await showCarsService.execute({
        available: true,
        brand: car.brand,
      } as IListCarFilterDTO),
    ).toHaveLength(1);
  });

  it('should be able list filter cars by license plate', async () => {
    expect(
      await showCarsService.execute({
        available: true,
        license_plate: car.license_plate,
      } as IListCarFilterDTO),
    ).toHaveLength(1);
  });

  it('should be able list filter cars by categoty', async () => {
    expect(
      await showCarsService.execute({
        available: true,
        category_id: car.category_id,
      } as IListCarFilterDTO),
    ).toHaveLength(1);
  });

  it('should be able list filter cars by description', async () => {
    expect(
      await showCarsService.execute({
        available: true,
        description: car.description,
      } as IListCarFilterDTO),
    ).toHaveLength(1);
  });
});
