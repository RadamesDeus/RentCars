import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplate from '../../MailTemplate/models/IMailTemplate';
import { ISendMail, ISendMailDTO } from '../ISendMail';

@injectable()
export default class EtherealMail implements ISendMail {
  private client: Transporter;

  constructor(
    @inject('MailTemplate')
    private mailTemplate: IMailTemplate,
  ) {
    nodemailer.createTestAccount().then(account => {
      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
      // console.log('account mail ', account);
    });
  }

  public async SendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const info = await this.client.sendMail({
      to: { name: to.name, address: to.email },
      from: {
        name: from?.name || 'Equipe Rental Cars',
        address: from?.email || 'equipe@rentalcars.com',
      },
      subject,
      html: await this.mailTemplate.parse(templateData),
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
