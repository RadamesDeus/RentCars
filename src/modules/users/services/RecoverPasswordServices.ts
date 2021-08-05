import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import moment from 'moment';
import path from 'path';
import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import AppError from '@errors/AppError';

import { ISendMail } from '../../../container/providers/Mail/ISendMail';

interface IRequest {
  email: string;
}

type IReponse = UserToken;

@injectable()
class RecoverPasswordServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SendMail')
    private SendMail: ISendMail,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email not exist', 401);
    const token = uuidv4();
    const userToken = await this.userTokenRepository.create({
      user_id: user.id,
      expires_date: moment().add(3, 'h').toDate(),
      refresh_token: token,
    });
    const templateForgotPasswor = path.resolve(
      __dirname,
      '..',
      'template/forgot _password.hbs',
    );

    await this.SendMail.SendEmail({
      to: { name: user.name, email: user.email },
      from: { name: 'Equipe Rental Cars', email: 'Equipe@RentalCars.com' },
      subject: 'Recuperação de senha',
      templateData: {
        templateFile: templateForgotPasswor,
        varibles: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/ResetPassword?token=${token}`,
        },
      },
    });
    return userToken;
  }
}

export default RecoverPasswordServices;
