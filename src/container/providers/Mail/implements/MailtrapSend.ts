import { ISendMail, ISendMailDTO } from '../ISendMail';

export default class MailtrapSend implements ISendMail {
  public async SendEmail({ to }: ISendMailDTO): Promise<void> {
    console.log('to', to);
  }
}
