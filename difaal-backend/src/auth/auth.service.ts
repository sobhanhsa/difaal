import { ForbiddenException, Injectable } from "@nestjs/common";
import { signUpDto } from "./dto";
import { DataBaseService } from "src/database/database.service";
import * as argon from 'argon2'
import { Response } from "express";
import {  JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private prisma : DataBaseService, 
        private jwt:JwtService,
        private confing:ConfigService
    ){}

    async signUpHandler(dto : signUpDto,response:Response) {
        
        const hash = await argon.hash(dto.password)

        try {

            const user = await this.prisma.user.create({
                data:{
                    name:dto.name,
                    hash:hash,
                    email:dto.email
                },
            })

            const token = await this.signToken(user.id)

            response.cookie('access_token',token)

            return user

        } catch (e) {

            if ((e instanceof Prisma.PrismaClientKnownRequestError) && (e.code === "P2002")) {            
                throw new ForbiddenException(
                        "taken email",
                    );
            }
            
            throw e
        
        }

    }
    signToken(userId : number) {
        const payload = {
            sub:userId
        }

        const secret = this.confing.get('JWT_SECRET')

        return this.jwt.signAsync(payload,{
            expiresIn:'1d',
            secret:secret
        })

    }
}