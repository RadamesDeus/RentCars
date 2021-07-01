import { injectable, inject } from "tsyringe";

import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import Category from "../typeorm/entities/Category";

@injectable()
class ShowCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}

export default ShowCategoriesService;
