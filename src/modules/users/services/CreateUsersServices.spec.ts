import HashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
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

describe('Create user', () => {
  it('should be able to create a new user', async () => {
    const data = {
      name: generete(),
      username: generete(),
      email: `${generete()}@test.com`,
      password: generete(),
      driver_license: 'A',
    };

    const user = await createUsersServices.execute(data);

    // const result = await api.post('users', data);
    // console.log(user);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with existing email', async () => {
    const data = {
      name: generete(),
      username: generete(),
      email: `teste@test.com`,
      password: generete(),
      driver_license: 'A',
    };

    expect(await createUsersServices.execute(data)).toHaveProperty('id');

    await expect(createUsersServices.execute(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to create a new user with existing name', async () => {
    const data = {
      name: generete(),
      username: 'Fakes',
      email: `${generete()}@test.com`,
      password: generete(),
      driver_license: 'A',
    };

    expect(await createUsersServices.execute(data)).toHaveProperty('id');

    await expect(createUsersServices.execute(data)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
