import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IUser } from '../modules/users/interfaces/user.interface';
import { Model } from 'mongoose';
import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../server.constants';

import { verify } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    
    const hasRole = () => user['roles'].some((role: string) => role.includes(role));
    return user && user['roles'] && hasRole();
  }
}
