import { injectable, inject } from "tsyringe";

import Specification from "../models/Specification";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

@injectable()
class ShowSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export default ShowSpecificationService;
