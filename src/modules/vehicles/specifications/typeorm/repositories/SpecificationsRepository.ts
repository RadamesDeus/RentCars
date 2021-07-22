import { getRepository, In, Repository } from 'typeorm';

import {
  ISpecificationsRepository,
  ISpecificationsRepositoryDTO,
} from '../../repositories/ISpecificationsRepository';
import Specification from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ISpecificationsRepositoryDTO): Promise<void> {
    const specification = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.ormRepository.find();
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  findByIds(
    listSpecification_id: string[],
  ): Promise<Specification[] | undefined> {
    return this.ormRepository.find({ id: In(listSpecification_id) });
  }
}
export default SpecificationsRepository;
