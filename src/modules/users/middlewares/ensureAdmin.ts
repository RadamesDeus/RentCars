import { Request, Response, NextFunction } from 'express';

import AppError from '@errors/AppError';

import UsersRepository from '../typeorm/repositories/UsersRepository';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  console.log('admin', user);

  if (!user?.admin)
    throw new AppError('the user does not a administrator', 401);

  return next();
}
