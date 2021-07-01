import { Request, Response } from "express";
import "reflect-metadata";
import { container } from "tsyringe";

import CreateCategoriesService from "../services/CreateCategoriesService";

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCategoriesService = container.resolve(CreateCategoriesService);

    const { name, description } = request.body;
    await createCategoriesService.execute({ name, description });
    return response.status(201).send();
  }
}
