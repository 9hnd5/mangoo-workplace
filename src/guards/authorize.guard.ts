import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppService } from 'src/app.service';
import { HEADER_KEY } from 'src/const/header.const';
import { ROLE_KEY } from 'src/decorators/authorize.decorator';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector, private appService: AppService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const role = this.reflector.get<string>(ROLE_KEY, context.getHandler());
    const token = request.headers[HEADER_KEY.AUTHORIZATION] as string | undefined;
    if (!token) return false;
    const data = await this.appService.auth(token, role);
    if (data) {
      request.user = data;
      return true;
    }
    return false;
  }
}
