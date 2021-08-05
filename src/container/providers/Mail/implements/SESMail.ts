import { injectable, inject } from 'tsyringe';

// import nodemailer, { Transporter } from 'nodemailer/lib/ses-transport';
import IMailTemplate from '../../MailTemplate/models/IMailTemplate';
import { ISendMail, ISendMailDTO } from '../ISendMail';

@injectable()
export default class SESMail implements ISendMail {
  // private client: Transporter;

  constructor(
    @inject('MailTemplate')
    private mailTemplate: IMailTemplate,
  ) {}

  public async SendEmail({
    to,
    subject,
    templateData,
    from,
  }: ISendMailDTO): Promise<void> {
    console.log('Message SES');
  }
}
