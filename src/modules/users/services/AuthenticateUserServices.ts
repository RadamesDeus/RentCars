import authConfig from "@config/auth";
import IHashPassword from "@modules/users/providers/HashPassword/IHashPassword";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/typeorm/entities/User";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import AppError from "@errors/AppError";

interface IRequest {
  email_username: string;

  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserServices {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashPassword")
    private hashPassword: IHashPassword
  ) {}

  public async execute({
    email_username,
    password,
  }: IRequest): Promise<IResponse> {
    let user = await this.usersRepository.findByEmail(email_username);

    if (!user) user = await this.usersRepository.findByUsername(email_username);

    if (!user)
      throw new AppError(
        "Incorrect email/username and password combination",
        401
      );

    const isMatched = await this.hashPassword.HashCompare(
      password,

      user.password
    );

    if (!isMatched)
      throw new AppError("Incorrect email/password combination", 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,

      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserServices;
