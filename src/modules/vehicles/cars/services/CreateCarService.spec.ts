import generete from '../../../../ultis/genereteText';
import FakeUsersRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';

const fakeUsersRepository = new FakeUsersRepository();
const createCarService = new CreateCarService(fakeUsersRepository);

describe('Create Car', () => {
  it('should be able to create a new car', async () => {
    const data = {
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    };
    expect(await createCarService.execute(data)).toHaveProperty('id');
  });
});
