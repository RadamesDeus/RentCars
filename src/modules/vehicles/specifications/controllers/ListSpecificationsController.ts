import { Request, Response } from "express";
import { container } from "tsyringe";

import ShowSpecificationService from "../services/ShowSpecificationService";

export default class ListSpecificationsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showSpecificationService = container.resolve(
      ShowSpecificationService
    );
    const specification = await showSpecificationService.execute();
    return response.status(200).json(specification);
  }
}
