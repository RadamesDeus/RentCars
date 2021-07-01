import { Request, Response } from "express";
import { container } from "tsyringe";

import ShowCategoriesService from "../services/ShowCategoriesService";

export default class ListCategoriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showCategoriesService = container.resolve(ShowCategoriesService);

    const categories = await showCategoriesService.execute();
    return response.status(200).json(categories);
  }
}
