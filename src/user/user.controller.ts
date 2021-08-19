import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationQueryDto } from 'src/core/common/pagination';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() query: PaginationQueryDto) {
    return await this.userService.getUsers(query);
  }
}
