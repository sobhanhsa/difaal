import { Injectable } from "@nestjs/common";
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
    
}