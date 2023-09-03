import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class CookieJwtStrategy extends PassportStrategy(Strategy,'cookie-jwt') {
    constructor(config:ConfigService, private prisma:PrismaClient){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET"),
        })
    }

    async validate(payload: {sub:number, email:string}) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: payload.sub
          }
        })
    
        if (! user) throw new BadRequestException({},'your account was deleted');
    
        delete user.hash
      
        return user;
      }

}