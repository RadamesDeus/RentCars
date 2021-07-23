import FakeSpecificationsRepository from '@modules/vehicles/specifications/repositories/fakes/FakeSpecificationsRepository';
import CreateSpecificationService from '@modules/vehicles/specifications/services/CreateSpecificationService';
import crypto from 'crypto';

import ShowSpecificationService from './ShowSpecificationService';

const generete = () => crypto.randomBytes(20).toString('hex');
const fakeCategoriesRepository = new FakeSpecificationsRepository();

const createSpecificationService = new CreateSpecificationService(
  fakeCategoriesRepository,
);

const show = new ShowSpecificationService(fakeCategoriesRepository);

describe('List Specification', () => {
  it('should be able list Specifications', async () => {
    await createSpecificationService.execute({
      name: generete(),
      description: generete(),
    });
    await createSpecificationService.execute({
      name: generete(),
      description: generete(),
    });
    await createSpecificationService.execute({
      name: generete(),
      description: generete(),
    });
    expect(await show.execute()).toHaveLength(3);
  });
});
