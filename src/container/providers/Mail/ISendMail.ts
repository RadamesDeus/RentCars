import IParseMailTemplateDTO from '../MailTemplate/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}
interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

interface ISendMail {
  SendEmail(data: ISendMailDTO): Promise<void>;
}

export { ISendMailDTO, ISendMail };
