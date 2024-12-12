import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}

export class UserParamsDto {
  @IsEmail()
  @IsDefined()
  email: string;
}
