import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { UserDto, UserParamsDto } from './dtos/user.dto';
import { Request, Response } from 'express';

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
  getUser(
    @Param() params: UserParamsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userData = this.userService.getUser(params.email);
      return res.status(HttpStatus.OK).json(userData);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
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
