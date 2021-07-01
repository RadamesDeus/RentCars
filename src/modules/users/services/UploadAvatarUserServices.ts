// import ICaches from "@modules/Caches/models/ICaches";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

import AppError from "@errors/AppError";

import IStorageFile from "../../../container/providers/StorageFile/IStorageFile";
import User from "../typeorm/entities/User";

interface IParmsRequest {
  user_id: string;

  avatar_filename: string;
}

@injectable()
class UploadAvatarUserServices {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StorageFile")
    private storageFile: IStorageFile // @inject('Caches') // private caches: ICaches,
  ) {}

  public async execute({
    user_id,

    avatar_filename,
  }: IParmsRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found", 401);

    if (user.avatar) {
      await this.storageFile.RemoveFile(user.avatar);
    }

    const userAvatar = await this.storageFile.SaveFile(avatar_filename);

    user.avatar = userAvatar;

    await this.usersRepository.save(user);

    // await this.caches.invalidatePrefix(`provider-list`);

    return user;
  }
}

export default UploadAvatarUserServices;
