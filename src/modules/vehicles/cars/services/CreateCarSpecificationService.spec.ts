import FakeSpecificationsRepository from '@modules/vehicles/specifications/repositories/fakes/FakeSpecificationsRepository';
import CreateSpecificationService from '@modules/vehicles/specifications/services/CreateSpecificationService';

import generete from '../../../../ultis/genereteText';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';
import CreateCarSpecificationService from './CreateCarSpecificationService';

const fakeCarsRepository = new FakeCarsRepository();
const createCarService = new CreateCarService(fakeCarsRepository);

const fakeSpecificationsRepository = new FakeSpecificationsRepository();

const createSpecificationService = new CreateSpecificationService(
  fakeSpecificationsRepository,
);

const createCarSpecificationService = new CreateCarSpecificationService(
  fakeCarsRepository,
  fakeSpecificationsRepository,
);

describe('Create Car', () => {
  it('should be able to add a new specification to the car', async () => {
    const dataCar = {
      description: generete(),
      daily_rate: 100,
      license_plate: generete(),
      fine_amount: 60,
      brand: generete(),
      category_id: generete(),
    };
    const car = await createCarService.execute(dataCar);

    const specification1 = await createSpecificationService.execute({
      name: generete(),
      description: generete(),
    });

    const specification2 = await createSpecificationService.execute({
      name: generete(),
      description: generete(),
    });

    const listSpecification: string[] = [specification1.id, specification2.id];
    const carSpecification = await createCarSpecificationService.execute({
      car_id: car.id,
      specification_ids: listSpecification,
    });

    expect(carSpecification).toHaveProperty('specifications');
    expect(carSpecification.specifications).toHaveLength(2);
  });
});
