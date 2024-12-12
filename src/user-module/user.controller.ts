import { Body, Controller, Delete, Get, Header, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { UserDto, UserParamsDto } from './dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //* HTTP GET /users
  @Get()
  getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  //* HTTP GET /users/:email
  @Get(':email')
  @UsePipes(new ValidationPipe())
  @Header('Cache-Control', 'none')
  getUser(@Param() params: UserParamsDto): IUser {
    return this.userService.getUser(params.email);
  }

  //* HTTP POST /users/nv@gmail.com
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  //* HTTP DELETE /users
  @Delete(':email')
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() params: UserParamsDto): Promise<IUser[]> {
    return this.userService.deleteUser(params.email);
  }
}
