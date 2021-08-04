import '../providers';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/typeorm/repositories/UserTokenRepository';
import { container } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
