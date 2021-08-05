import { container } from 'tsyringe';

import HandlebarsMailTemplate from './implements/HandlebarsMailTemplate';
import IMailTemplate from './models/IMailTemplate';

container.registerSingleton<IMailTemplate>(
  'MailTemplate',
  HandlebarsMailTemplate,
);
