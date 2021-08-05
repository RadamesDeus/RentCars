import fs from 'fs';
import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplate from '../models/IMailTemplate';

class HandlebarsMailTemplate implements IMailTemplate {
  public async parse({
    templateFile,
    varibles,
  }: IParseMailTemplateDTO): Promise<string> {
    const readtemplateFile = await fs.promises.readFile(templateFile, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(readtemplateFile);

    return parseTemplate(varibles);
  }
}

export default HandlebarsMailTemplate;
