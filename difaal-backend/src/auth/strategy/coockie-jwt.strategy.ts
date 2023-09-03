import { ArgumentsHost, BadRequestException, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import { DataBaseService } from "src/database/database.service";

@Injectable()
export class CookieJwtStrategy extends PassportStrategy(Strategy,'cookie-jwt') {
  constructor(config:ConfigService, private prisma:DataBaseService){
      super({
          jwtFromRequest: (req:Request):string | null => {
            let accessToken = req.cookies['access_token']
            // if (!accessToken) accessToken = ''
            return accessToken
          },
          ignoreExpiration: false,
          secretOrKey: config.get("JWT_SECRET"),
      })
  }

  async validate(payload: {sub:number}) {

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })

    if (! user) throw new BadRequestException('your account was deleted');

    delete user.hash

    // req.user = user
    return user;
  
  }
}