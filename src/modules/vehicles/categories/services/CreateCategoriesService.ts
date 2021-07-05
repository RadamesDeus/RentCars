import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import Category from '../typeorm/entities/Category';

interface IRequet {
  name: string;
  description: string;
}

@injectable()
class CategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute({ name, description }: IRequet): Promise<Category> {
    if (await this.categoriesRepository.findByName(name)) {
      throw new AppError('Já Existe essa categoria');
    }
    const category = await this.categoriesRepository.create({
      name,
      description,
    });
    return category;
  }
}

export default CategoriesService;
