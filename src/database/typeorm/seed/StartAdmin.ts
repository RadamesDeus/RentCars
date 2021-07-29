import { Connection } from 'typeorm';

import BCryptHashPassword from '../../../modules/users/providers/HashPassword/implements/BCryptHashPassword';
import User from '../../../modules/users/typeorm/entities/User';
import CrateConnection from '../index';

interface IConnectionAdmin {
  user: User;
  connection: Connection;
}

class StartAdmin {
  private connection: Connection;
  async openConnection(): Promise<Connection> {
    this.connection = await CrateConnection();
    return this.connection;
  }

  async closeConnection(): Promise<void> {
    this.connection.close();
  }

  async dropUserAdmin(NODE_ENV?: string): Promise<void> {
    const connection = await CrateConnection();
    if (NODE_ENV === 'test') await connection.dropDatabase();
    connection.close();
  }

  async createUserAdmin(NODE_ENV?: string): Promise<IConnectionAdmin> {
    this.connection = await CrateConnection();
    const ormRepository = this.connection.getRepository(User);
    const hashPassword = new BCryptHashPassword();

    if (NODE_ENV === 'test') await this.connection.runMigrations();

    const data = {
      name: 'admin',
      username: 'admin',
      email: `admin@rentals.com`,
      password: await hashPassword.HashCrete('admin'),
      driver_license: 'A',
      admin: true,
    };

    let user = await ormRepository.findOne({
      where: { username: data.username.toLowerCase() },
    });

    if (!user) {
      user = ormRepository.create(data);
      await ormRepository.save(user);
    }
    console.log('User admin crated successfully', user);
    if (!NODE_ENV) this.connection.close();

    return { user, connection: this.connection };
  }
}

export default StartAdmin;
