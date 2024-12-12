import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  //!   HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { UserDto, UserParamsDto } from './dtos/user.dto';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './filters/user.filter';
// import { ZodValidationPipe } from './pipes/user.pipe';
import { AuthGuard } from './guards/user.guard';
import { LoggingInterceptor } from './interceptors/user.interceptor';
@Controller('users')
//* @UseGuards(AuthGuard) we can also use guards in controller level
//* @UseInterceptors(LoggingInterceptor)  we can also use interceptors in controller level
export class UserController {
  constructor(private readonly userService: UserService) {}

  //* HTTP GET /users
  @Get()
  @UseFilters(new HttpExceptionFilter())
  getUsers(): IUser[] {
    return this.userService.getUsers();
    //! throw new HttpException('Users not found!', 404);  for simulating the HttpExceptionFilter
  }

  //* HTTP GET /users/:email
  @Get(':email')
  @UsePipes(new ValidationPipe())
  @Header('Cache-Control', 'none')
  @UseGuards(new AuthGuard()) 
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
  // !  @UsePipes(new ZodValidationPipe()) ===> use UserSchema when available
  @UsePipes(new ValidationPipe())
  @UseInterceptors(new LoggingInterceptor)
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
