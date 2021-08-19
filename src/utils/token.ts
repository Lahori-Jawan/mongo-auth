import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ForbiddenException, Logger } from '@nestjs/common';
import { messages } from 'src/core/config/messages';
import tryy from './tryCatch';

let jwtSecret = process.env.TOKEN_SECRET || 'xyz007abcnk7891';
let refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || '#$!xyz007abcnk7891%&*';

const logger = new Logger('utils/token');

export const getToken = (req: Request) => {
  let error = null;
  if (!req?.headers?.authorization?.includes('bearer ')) {
    error = new ForbiddenException(messages.INVALID_REQUEST);
  }

  return [error, req.headers.authorization];
};

export const verifyToken = (token: string) => {
  const [error, user] = tryy(jwt.verify(token, jwtSecret));
  console.log('utils.token/verifyToken =>', { error, user });
  if (error || !user) {
    logger.error(error);
    throw new ForbiddenException(messages.TOKEN_EXPIRED);
  }

  return [error, user];
};

export const createToken = (
  payload: string | object,
  tokenDuration = '1d',
  refreshTokenDuration = '7d',
) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenDuration });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenDuration,
  });

  return [token, refreshToken];
};
