import Category from '@modules/vehicles/categories/typeorm/entities/Category';
import { v4 as uuidv4 } from 'uuid';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private Category: Category[] = [];

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuidv4(), name, description });
    this.Category.push(category);
    return category;
  }

  public async list(): Promise<Category[]> {
    return this.Category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    return this.Category.find(item => item.name === name);
  }
}
export default FakeCategoriesRepository;
