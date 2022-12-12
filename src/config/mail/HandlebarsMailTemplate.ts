import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
    public async parse({
        template,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(template, {
            encoding: 'utf-8',
        });

        const parseTemplate = Handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}
