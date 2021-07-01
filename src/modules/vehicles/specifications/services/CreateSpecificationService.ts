import { injectable, inject } from "tsyringe";

import AppError from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequet {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequet): Promise<void> {
    if (await this.specificationsRepository.findByName(name)) {
      throw new AppError("Já Existe essa especifição");
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationService;
