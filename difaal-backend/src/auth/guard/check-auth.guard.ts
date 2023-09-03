import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export class isLoggedIn implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request : Request = ctx.switchToHttp().getRequest()

        if (request.cookies['access_token']) throw new BadRequestException("you're already logged in")

        return true
    }
}