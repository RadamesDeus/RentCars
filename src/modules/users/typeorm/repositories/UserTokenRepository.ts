import {
  IUserTokenRepository,
  ICreateUserToken,
} from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { getRepository, Repository } from 'typeorm';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(createUserToken: ICreateUserToken): Promise<UserToken> {
    const userToken = this.ormRepository.create(createUserToken);
    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async findByUserIdAndToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  async findByUserId(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { user_id },
    });
    return userToken;
  }

  async deleteByid(userToken_id: string): Promise<void> {
    await this.ormRepository.delete({ id: userToken_id });
  }
}

export default UserTokenRepository;
