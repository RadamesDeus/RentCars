import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IShowRentalsDTO } from '../repositories/IRentalsRepository';
import ShowRentalsService from '../services/ShowRentalsService';

export default class ShowRentalsController {
  async show(request: Request, response: Response): Promise<Response> {
    const showRentalsService = container.resolve(ShowRentalsService);

    const showRentalsDTO = request.query as unknown as IShowRentalsDTO;

    const list = await showRentalsService.execute(showRentalsDTO);
    return response.status(200).send(list);
  }
}
