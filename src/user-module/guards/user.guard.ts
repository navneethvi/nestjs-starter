import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        // roles validation
        return this.validateRequest(request)
    }
    public validateRequest(req: Request): Promise<any> | any | Observable<any> {
        console.log(req);
        return Promise.resolve(Boolean)
    }
}