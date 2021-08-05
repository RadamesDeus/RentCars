import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplate from '../models/IMailTemplate';

class FakeMailTemplate implements IMailTemplate {
  public async parse({
    templateFile,
    varibles,
  }: IParseMailTemplateDTO): Promise<string> {
    return 'Fake Mail Template';
  }
}

export default FakeMailTemplate;
