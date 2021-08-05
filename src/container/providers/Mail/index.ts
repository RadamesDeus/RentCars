import mailConfig from '@config/mail';
import { container } from 'tsyringe';

import EtherealMail from './implements/EtherealMail';
import SESMail from './implements/SESMail';
import { ISendMail } from './ISendMail';

const providers = {
  ethereal: container.resolve(EtherealMail),
  ses: container.resolve(SESMail),
};

container.registerInstance<ISendMail>('SendMail', providers[mailConfig.driver]);
