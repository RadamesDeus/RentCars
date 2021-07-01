import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoriesFileService from "../services/CreateCategoriesFileService";

export default class CreateCategoriesFileController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCategoriesFileService = container.resolve(
      CreateCategoriesFileService
    );

    const { filename } = request.file;
    await createCategoriesFileService.execute({ filename });
    return response.status(201).send();
  }
}
