import { injectable, inject } from "tsyringe";

import AppError from "@errors/AppError";

import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequet {
  name: string;
  description: string;
}

@injectable()
class CategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  public async execute({ name, description }: IRequet): Promise<void> {
    if (await this.categoriesRepository.findByName(name)) {
      throw new AppError("Já Existe essa categoria");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export default CategoriesService;
