import { getRepository, Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(category);
    return category;
  }

  public async list(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  public async findByName(name: string): Promise<Category | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}
export default CategoriesRepository;
