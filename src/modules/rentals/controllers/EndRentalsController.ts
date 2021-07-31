import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EndRentalsService from '../services/EndRentalsService';

export default class CreateRentalsController {
  async update(request: Request, response: Response): Promise<Response> {
    const endRentalsService = container.resolve(EndRentalsService);

    const { rental_id } = request.params;

    const rental = await endRentalsService.execute(rental_id as string);
    return response.status(200).send(rental);
  }
}
