import FakeSpecificationsRepository from '@modules/vehicles/specifications/repositories/fakes/FakeSpecificationsRepository';
import CreateSpecificationService from '@modules/vehicles/specifications/services/CreateSpecificationService';
import crypto from 'crypto';

import AppError from '@errors/AppError';

const generete = () => crypto.randomBytes(20).toString('hex');
const fakeSpecificationsRepository = new FakeSpecificationsRepository();

const createSpecificationService = new CreateSpecificationService(
  fakeSpecificationsRepository,
);

describe('Create specification', () => {
  it('should be able to create a new specification', async () => {
    const data = {
      name: generete(),
      description: generete(),
    };
    expect(await createSpecificationService.execute(data)).toHaveProperty('id');
  });

  it('should not be able to create a new specification with existing', async () => {
    const data = {
      name: generete(),
      description: generete(),
    };

    expect(await createSpecificationService.execute(data)).toHaveProperty('id');

    await expect(
      createSpecificationService.execute(data),
    ).rejects.toBeInstanceOf(AppError);
  });
});
