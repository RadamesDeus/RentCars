// import ICaches from "@modules/Caches/models/ICaches";

import IHashPassword from '@modules/users/providers/HashPassword/IHashPassword';
import {
  IUsersRepository,
  ICreateUsersDTO,
} from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

@injectable()
class CreateUsersServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashPassword')
    private hashPassword: IHashPassword, // @inject("Caches") // private caches: ICaches
  ) {}

  public async execute({
    name,
    email,
    username,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<User> {
    if (await this.usersRepository.findByUsername(username))
      throw new AppError('Username already exists.');

    if (await this.usersRepository.findByEmail(email))
      throw new AppError('Email already exists.');

    const hashPassword = await this.hashPassword.HashCrete(password);
    const user = await this.usersRepository.create({
      name,
      email,
      username,
      password: hashPassword,
      driver_license,
    });

    // await this.caches.invalidatePrefix(`provider-list`);

    return user;
  }
}

export default CreateUsersServices;
