import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSpecificationService from "../services/CreateSpecificationService";

export default class CreateSpecificationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );
    const { name, description } = request.body;
    await createSpecificationService.execute({ name, description });
    return response.status(201).send();
  }
}
