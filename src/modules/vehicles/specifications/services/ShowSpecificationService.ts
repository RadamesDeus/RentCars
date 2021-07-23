import Specification from '@modules/vehicles/specifications/typeorm/entities/Specification';
import { injectable, inject } from 'tsyringe';

import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

@injectable()
class ShowSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}
  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export default ShowSpecificationService;
