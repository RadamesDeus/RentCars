import User from '../typeorm/entities/User';

interface ICreateUsersDTO {
  name: string;
  email: string;
  username: string;
  password: string;
  driver_license: string;
}

interface IUsersRepository {
  findAll(): Promise<User[]>;
  create(date: ICreateUsersDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User | undefined>;
}

export { IUsersRepository, ICreateUsersDTO };
