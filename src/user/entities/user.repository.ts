import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ServerException } from '@src/utils/exceptions/server.exception';
import { Model, ObjectId } from 'mongoose';
import { DUPLICATE_ERROR } from 'src/core/common/duplicateError';
import { PaginationQueryDto, makePagination } from 'src/core/common/pagination';
import { messages } from 'src/core/config/messages';
import tryy from 'src/utils/tryCatch';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private logger = new Logger('UserRepository');

  async createUser(userDto: CreateUserDto) {
    const user = new this.userModel(userDto);
    user.accessToken = this.createToken({ id: user._id });

    const [error, data] = await tryy(user.save());

    if (error) {
      if (error.code === DUPLICATE_ERROR)
        throw new ConflictException(messages.DUPLICATE_USER);
      this.logger.error(error);
      throw new ServerException();
    }

    return data;
  }

  async getUser(userCredentials: GetUserDto): Promise<User | null> {
    return await this.userModel.findOne({ ...userCredentials });
  }

  async getUsers(query: PaginationQueryDto): Promise<User[]> {
    const pager = makePagination(query);
    return await this.userModel.find().skip(pager.skip).limit(pager.limit);
  }

  createToken(payload: { id: string | ObjectId }) {
    return this.jwtService.sign(payload);
  }
}
