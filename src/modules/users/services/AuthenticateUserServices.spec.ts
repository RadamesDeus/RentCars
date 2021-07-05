import HashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';
import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import crypto from 'crypto';

import AppError from '@errors/AppError';

const generete = () => crypto.randomBytes(20).toString('hex');
const usersRepository = new FakeUsersRepository();
const hashPassword = new HashPassword();
const createUsersServices = new CreateUsersServices(
  usersRepository,
  hashPassword,
);
const authenticateUserServices = new AuthenticateUserServices(
  usersRepository,
  hashPassword,
);

describe('Authenticate User', () => {
  it('should be able to authenticate a user', async () => {
    const data = {
      name: generete(),
      username: generete(),
      email: `${generete()}@test.com`,
      password: generete(),
      driver_license: 'A',
    };

    const user = await createUsersServices.execute(data);
    expect(user).toHaveProperty('id');

    const aute = await authenticateUserServices.execute({
      email_username: user.username,
      password: user.password,
    });

    expect(aute).toHaveProperty('token');
  });

  it('should not be able to authenticate a user', async () => {
    const data = {
      name: generete(),
      username: generete(),
      email: `teste@test.com`,
      password: generete(),
      driver_license: 'A',
    };

    const user = await createUsersServices.execute(data);
    expect(user).toHaveProperty('id');

    await expect(
      authenticateUserServices.execute({
        email_username: generete(),
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateUserServices.execute({
        email_username: user.email,
        password: generete(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
