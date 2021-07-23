import { injectable, inject } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';
import Specification from '../typeorm/entities/Specification';

interface IRequet {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}
  async execute({ name, description }: IRequet): Promise<Specification> {
    if (await this.specificationsRepository.findByName(name)) {
      throw new AppError('Já Existe essa especifição');
    }

    return this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationService;
