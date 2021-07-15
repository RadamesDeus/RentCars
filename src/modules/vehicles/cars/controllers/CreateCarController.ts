import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import CreateCarsService from '../services/CreateCarService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCarsService = container.resolve(CreateCarsService);

    const {
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = request.body;
    const car = await createCarsService.execute({
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    return response.status(201).send(car);
  }
}
