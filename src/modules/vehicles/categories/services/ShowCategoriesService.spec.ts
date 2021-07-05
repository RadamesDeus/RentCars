import FakeCategoriesRepository from '@modules/vehicles/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesService from '@modules/vehicles/categories/services/CreateCategoriesService';
import crypto from 'crypto';

import AppError from '@errors/AppError';

import ShowCategoriesService from './ShowCategoriesService';

const generete = () => crypto.randomBytes(20).toString('hex');
const categoriesRepository = new FakeCategoriesRepository();

const createCategoriesService = new CreateCategoriesService(
  categoriesRepository,
);

const show = new ShowCategoriesService(categoriesRepository);

describe('List Category', () => {
  it('should be able list categores', async () => {
    await createCategoriesService.execute({
      name: generete(),
      description: generete(),
    });
    await createCategoriesService.execute({
      name: generete(),
      description: generete(),
    });
    await createCategoriesService.execute({
      name: generete(),
      description: generete(),
    });
    expect(await show.execute()).toHaveLength(3);
  });
});
