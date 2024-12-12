import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  public users: IUser[] = [];

  getUsers(): IUser[] {
    return this.users;
  }

  getUser(email: string): IUser {
    const userData = this.users.filter((user) => user.email === email)[0];

    if (!userData) {
      throw new NotFoundException(`User with email '${email}' not found!`);
    }

    return userData;
  }

  createUser(user: IUser): IUser {
    this.users.push(user);
    
    return user;
  }

  deleteUser(email: string): IUser[] {
    const userIndex = this.users.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      throw new NotFoundException(`User with email '${email}' not found!`);
    }

    this.users.splice(userIndex, 1);

    return this.users;
  }
}
