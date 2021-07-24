import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import CreateCarSpecificationService from '../services/CreateCarSpecificationService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService,
    );

    const { specification_ids } = request.body;
    const { car_id } = request.params;

    const car = await createCarSpecificationService.execute({
      car_id,
      specification_ids,
    });
    return response.status(201).send(car);
  }
}
