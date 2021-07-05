import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, username, password, driver_license } = request.body;

    const createUsersServices = container.resolve(CreateUsersServices);

    const user = await createUsersServices.execute({
      name,
      email,
      username,
      password,
      driver_license,
    });

    return response.json(classToClass(user));
  }
}
