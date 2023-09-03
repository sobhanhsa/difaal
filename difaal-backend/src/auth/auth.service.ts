import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { signInDto, signUpDto } from "./dto";
import { DataBaseService } from "src/database/database.service";
import * as argon from 'argon2'
import { Response } from "express";
import {  JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Prisma, User } from "@prisma/client";

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

            delete user.hash

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

    async signInHandler(dto : signInDto, response:Response) {
        const user : User = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        });

        if (!user) throw new NotFoundException("no account with this email exists")

        
        if (! (await argon.verify(user.hash, dto.password))) throw new 
            ForbiddenException("incorrect password")

        const token = await this.signToken(user.id)

        delete user.hash

        response.cookie('access_token',token)

        return user

    }

    signOutHandler(response:Response) {    

        response.cookie('access_token','false',{
            expires: new Date(Date.now() - 1000000000)
        })

        return {
            message:"you're successfully signed out"
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