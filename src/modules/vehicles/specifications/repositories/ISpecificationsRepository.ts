import Specification from '../typeorm/entities/Specification';

interface ISpecificationsRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsRepositoryDTO): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(
    listSpecification_id: string[],
  ): Promise<Specification[] | undefined>;
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO };
