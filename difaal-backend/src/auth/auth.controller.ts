import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { signUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    
    @HttpCode(201)
    @Post('signup')
    signUp (
        @Body() dto:signUpDto, 
        @Res({passthrough:true}) response : Response
    )
    {   
        return this.authService.signUpHandler(dto,response)
    }

}