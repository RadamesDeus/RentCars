// index, show, create, update, delete

import ShowProfileUserServices from '@modules/users/services/ShowProfileUserServices';
import UpdateProfileUserServices from '@modules/users/services/UpdateProfileUserServices';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileUserServices = container.resolve(ShowProfileUserServices);

    const user = await showProfileUserServices.execute(user_id);

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, oldpassword, password } = request.body;

    const UpdateProfileUser = container.resolve(UpdateProfileUserServices);

    const user = await UpdateProfileUser.execute({
      user_id,

      name,

      email,

      oldpassword,

      password,
    });

    return response.json(classToClass(user));
  }
}
