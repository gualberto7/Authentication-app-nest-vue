import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.rawHeaders)
      throw new InternalServerErrorException(
        'Raw headers not found in request',
      );

    return req.rawHeaders;
  },
);
