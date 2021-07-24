import authConfig from '@config/auth';
import { Request, Response, NextFunction } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';

import AppError from '@errors/AppError';

interface ITokenPayLoad {
  iat: string;
  exp: string;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  verify(token, authConfig.jwt.secret, (err, decoded) => {
    if (err instanceof TokenExpiredError) {
      throw new AppError(`Token Expired`, 401);
    }

    if (err) throw new AppError(err.message, 401);

    const { sub } = decoded as unknown as ITokenPayLoad;

    request.user = {
      id: sub,
    };

    return next();
  });
}
