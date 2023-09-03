import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { signInDto, signUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { Request, Response, response } from "express";

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
        
    @HttpCode(200)
    @Post('signin')
    signIn(
        @Body() dto:signInDto,
        @Res({passthrough:true}) response : Response,
    ) 
    {
        return this.authService.signInHandler(dto, response)
    }

    @HttpCode(200)
    @Get('signout')
    signOut(
        @Res({passthrough:true}) 
        response:Response
    ) 
    {
        return this.authService.signOutHandler(response)
    }


}