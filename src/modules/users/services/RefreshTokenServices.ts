import authConfig from '@config/auth';
import IHashPassword from '@modules/users/providers/HashPassword/IHashPassword';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/typeorm/entities/User';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import moment from 'moment';
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import { IUserTokenRepository } from '../repositories/IUserTokenRepository';
import UserToken from '../typeorm/entities/UserToken';

interface IResponse {
  token: string;
  refresh_token: string;
}

interface ITokenPayLoad {
  iat: string;
  exp: string;
  sub: string;
}

@injectable()
class AuthenticateUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashPassword')
    private hashPassword: IHashPassword,
  ) {}

  public async execute(refresh_tokenIn: string): Promise<IResponse> {
    const {
      secret,
      expiresIn,
      secret_refresh,
      expiresIn_Refresh,
      expiresIn_Refresh_day,
    } = authConfig.jwt;

    let decode = {} as ITokenPayLoad;
    verify(refresh_tokenIn, secret_refresh, (err, decoded) => {
      if (err instanceof TokenExpiredError) {
        throw new AppError(`Token Expired`, 401);
      }

      if (err) throw new AppError(err.message, 401);

      decode = decoded as unknown as ITokenPayLoad;
    });

    const { sub } = decode as unknown as ITokenPayLoad;

    const user_id = sub;

    const userToken = await this.userTokenRepository.findByUserIdAndToken(
      user_id,
      refresh_tokenIn,
    );
    if (!userToken) throw new AppError('Not exist refresh user tokens', 401);

    this.userTokenRepository.deleteByid(userToken.id);

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    const refresh_token = sign({}, secret_refresh, {
      subject: user_id,
      expiresIn: expiresIn_Refresh,
    });

    await this.userTokenRepository.create({
      user_id,
      expires_date: moment().add(expiresIn_Refresh_day, 'd').toDate(),
      refresh_token,
    });
    return { token, refresh_token };
  }
}

export default AuthenticateUserServices;
