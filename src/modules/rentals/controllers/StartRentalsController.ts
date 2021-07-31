import { Request, Response } from 'express';
import { container } from 'tsyringe';

import StartRentalsService from '../services/StartRentalsService';

export default class CreateRentalsController {
  async update(request: Request, response: Response): Promise<Response> {
    const startRentalsService = container.resolve(StartRentalsService);

    const { rental_id } = request.params;

    const rental = await startRentalsService.execute(rental_id as string);
    return response.status(200).send(rental);
  }
}
