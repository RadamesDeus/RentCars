import UserToken from '../typeorm/entities/UserToken';

interface ICreateUserToken {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

interface IUserTokenRepository {
  findByUserId(user_id: string): Promise<UserToken | undefined>;
  deleteByid(userToken_id: string): Promise<void>;
  findByUserIdAndToken(
    user_id: string,
    token: string,
  ): Promise<UserToken | undefined>;
  create(createUserToken: ICreateUserToken): Promise<UserToken>;
  findByToken(id: string): Promise<UserToken | undefined>;
}

export { IUserTokenRepository, ICreateUserToken };
