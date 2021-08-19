import { InternalServerErrorException } from '@nestjs/common';
import { messages } from '@src/core/config/messages';

export class ServerException extends InternalServerErrorException {
  constructor() {
    super(messages.SERVER_ERROR);
  }
}
