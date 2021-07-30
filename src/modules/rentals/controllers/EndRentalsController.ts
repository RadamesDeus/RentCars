import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalsService from '../services/CreateRentalsService';

export default class CreateRentalsController {
  async update(request: Request, response: Response): Promise<Response> {
    const createRentalsService = container.resolve(CreateRentalsService);
    const { id: user_id } = request.user;
    const { car_id, start_date, expected_return_date } = request.body;

    await createRentalsService.execute({
      car_id,
      user_id,
      start_date,
      expected_return_date,
    });
    return response.status(201).send();
  }
}
