import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IListCarFilterDTO } from '../repositories/ICarsRepository';
import ShowCarsService from '../services/ShowCarsService';

export default class ListCategoriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showCarsService = container.resolve(ShowCarsService);
    const data = request.query as unknown;
    const cars = await showCarsService.execute(data as IListCarFilterDTO);
    return response.status(200).json(cars);
  }
}
