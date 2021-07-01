// index, show, create, update, delete

import UploadAvatarUserServices from "@modules/users/services/UploadAvatarUserServices";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;

    const uploadAvatarUser = container.resolve(UploadAvatarUserServices);

    const user = await uploadAvatarUser.execute({
      user_id: request.user.id,

      avatar_filename: filename,
    });

    return response.json(classToClass(user));
  }
}
