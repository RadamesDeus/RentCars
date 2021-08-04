import RefreshTokenServices from '@modules/users/services/RefreshTokenServices';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { refresh_tokenIn } =
      request.body || request.headers['x-access-token'] || request.query.token;

    const refreshTokenServices = container.resolve(RefreshTokenServices);

    const { token, refresh_token } = await refreshTokenServices.execute(
      refresh_tokenIn,
    );

    return response.json({ token, refresh_token });
  }
}
