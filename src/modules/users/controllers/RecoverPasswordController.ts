import RecoverPasswordServices from '@modules/users/services/RecoverPasswordServices';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RecoverPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const recoverPasswor = container.resolve(RecoverPasswordServices);

    await recoverPasswor.execute({ email });

    return response.status(204).json();
  }
}
