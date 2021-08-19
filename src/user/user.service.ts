import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/core/common/pagination';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(query: PaginationQueryDto) {
    return await this.userRepository.getUsers(query);
  }
}
