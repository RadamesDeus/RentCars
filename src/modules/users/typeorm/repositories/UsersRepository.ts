import {
  ICreateUsersDTO,
  IUsersRepository,
} from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    username,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      driver_license,
    });

    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email: email.toLowerCase() },
      select: [
        'id',
        'username',
        'name',
        'password',
        'email',
        'driver_license',
        'admin',
        'avatar',
      ],
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username: username.toLowerCase() },
      select: [
        'id',
        'username',
        'password',
        'name',
        'email',
        'driver_license',
        'admin',
        'avatar',
      ],
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async save(users: User): Promise<User | undefined> {
    return this.ormRepository.save(users);
  }
}

export default UsersRepository;
