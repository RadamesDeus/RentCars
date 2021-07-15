import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowCarsService from '../services/ShowCarsService';

export default class ListCategoriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showCarsService = container.resolve(ShowCarsService);

    const cars = await showCarsService.execute();
    return response.status(200).json(cars);
  }
}
