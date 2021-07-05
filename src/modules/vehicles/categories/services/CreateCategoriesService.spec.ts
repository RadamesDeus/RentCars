import FakeCategoriesRepository from '@modules/vehicles/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesService from '@modules/vehicles/categories/services/CreateCategoriesService';
import crypto from 'crypto';

import AppError from '@errors/AppError';

// import ShowCategoriesService from './ShowCategoriesService';

const generete = () => crypto.randomBytes(20).toString('hex');
const categoriesRepository = new FakeCategoriesRepository();

const createCategoriesService = new CreateCategoriesService(
  categoriesRepository,
);

// const show = new ShowCategoriesService(categoriesRepository);

describe('Create Category', () => {
  it('should be able to create a new category', async () => {
    const data = {
      name: generete(),
      description: generete(),
    };
    expect(await createCategoriesService.execute(data)).toHaveProperty('id');
  });

  it('should not be able to create a new category with existing', async () => {
    const data = {
      name: generete(),
      description: generete(),
    };

    expect(await createCategoriesService.execute(data)).toHaveProperty('id');

    await expect(createCategoriesService.execute(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
