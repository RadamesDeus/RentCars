import {
  IUsersRepository,
  ICreateUsersDTO,
} from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';

// interface ICreateUsersRequest extends ICreateUsersDTO {
//   created_at?: Date;
// }

class FakeUsersRepository implements IUsersRepository {
  private Users: User[] = [];

  public async create({
    name,
    email,
    username,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuidv4(),
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      driver_license,
    });
    this.Users.push(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.Users.find(userFind => userFind.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.Users.find(userfind => userfind.email === email);
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.Users;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = this.Users.find(userfind => userfind.username === username);
    return user;
  }

  public async save(users: User): Promise<User | undefined> {
    const userIndex = this.Users.findIndex(user => user.id === users.id);
    if (userIndex) this.Users[userIndex] = users;
    return users;
  }
}

export default FakeUsersRepository;
