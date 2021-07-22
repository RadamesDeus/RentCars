import { v4 as uuidv4 } from 'uuid';

import Specification from '../../typeorm/entities/Specification';
import {
  ISpecificationsRepository,
  ISpecificationsRepositoryDTO,
} from '../ISpecificationsRepository';

class FakeCategoriesRepository implements ISpecificationsRepository {
  private Specification: Specification[] = [];

  public async create({
    name,
    description,
  }: ISpecificationsRepositoryDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(Specification, { id: uuidv4(), name, description });
    this.Specification.push(specification);
  }

  public async list(): Promise<Specification[]> {
    return this.Specification;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    return this.Specification.find(item => item.name === name);
  }
  public async findByIds(
    listSpecification_id: string[],
  ): Promise<Specification[] | undefined> {
    return this.Specification.filter(item =>
      listSpecification_id.includes(item.id),
    );
  }
}
export default FakeCategoriesRepository;
