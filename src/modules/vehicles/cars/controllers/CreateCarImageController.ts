import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import UploadImageCarServices from '../services/UploadImageCarServices';

interface IFiles {
  filename: string;
}

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const uploadImageCarServices = container.resolve(UploadImageCarServices);

    const { car_id } = request.params;
    const images = request.files as IFiles[];

    const filename = images.map(image => image.filename);

    const carImaes = await uploadImageCarServices.execute({
      car_id,
      imagesUrl: filename,
    });
    return response.status(201).send(carImaes);
  }
}
