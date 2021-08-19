import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { messages } from '@src/core/config/messages';
import { GetUserDto } from '@src/user/dto/get-user.dto';
import { UserRepository } from '@src/user/entities';
import { ServerException } from '@src/utils/exceptions/server.exception';
import tryy from '@src/utils/tryCatch';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async loginUser({ email, password }: LoginUserDto) {
    const user = await this.userRepository.getUser({ email });

    if (!user) throw new NotFoundException(messages.USER_NOT_FOUND);

    const isPasswordMatch = await user.isPasswordValid(password);

    if (!isPasswordMatch)
      throw new BadRequestException(messages.BAD_LOGIN_REQUEST);

    user.accessToken = this.createToken({ id: user._id });

    const [error] = await tryy(user.save());

    if (error) throw new ServerException();

    return user;
  }

  async getUser(userCredentials: GetUserDto) {
    return await this.userRepository.getUser(userCredentials);
  }

  createToken(payload: any) {
    return this.userRepository.createToken(payload);
  }
}
