import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@src/user/entities';

export const GetRequestUser = createParamDecorator(
  (data, req: ExecutionContext): User => {
    // ? extracting user from request object
    return req.switchToHttp().getRequest().user;
  },
);
