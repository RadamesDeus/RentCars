import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

import AppError from "@errors/AppError";

import User from "../typeorm/entities/User";

@injectable()
class ShowProfileUserServices {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found", 401);

    return user;
  }
}

export default ShowProfileUserServices;
