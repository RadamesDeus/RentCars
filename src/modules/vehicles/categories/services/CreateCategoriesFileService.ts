import UploadConfig from "@config/upload";
import csvParse from "csv-parse";
import fs from "fs";
import path from "path";
import { injectable, inject } from "tsyringe";

import AppError from "@errors/AppError";

import RemoveFile from "../../../../ultis/RemoveFile";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequet {
  filename: string;
}

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class CategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  public async loadFile(filename: string): Promise<IImportCategory[]> {
    try {
      return new Promise((resolve, reject) => {
        const filePath = path.resolve(UploadConfig.pathTmp, filename);
        const categories: IImportCategory[] = [];

        const stream = fs.createReadStream(filePath);
        const parseFile = csvParse();
        stream.pipe(parseFile);

        parseFile
          .on("data", async (line) => {
            console.log(line);
            const [name, description] = line;
            categories.push({
              name: name as string,
              description: description as string,
            });
          })
          .on("end", () => {
            resolve(categories);
          })
          .on("error", (err) => {
            throw new AppError(err.message);
          });
      });
    } catch (error) {
      throw new AppError(`When importing categories: ${error.message}`);
    }
  }

  public async execute({ filename }: IRequet): Promise<void> {
    const categories = await this.loadFile(filename);

    categories.map(async (category) => {
      const { name } = category;
      const existName = await this.categoriesRepository.findByName(name);
      if (!existName) {
        await this.categoriesRepository.create(category);
      }
    });
    RemoveFile.execute(filename);
  }
}

export default CategoriesService;
