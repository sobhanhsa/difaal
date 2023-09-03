import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { signInDto, signUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { Request, Response, response } from "express";
import { isLoggedIn } from "./guard/check-auth.guard";
import { CookieJwtGuard } from "./guard";

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @UseGuards(isLoggedIn)
    @HttpCode(201)
    @Post('signup')
    signUp (
        @Body() dto:signUpDto, 
        @Res({passthrough:true}) response : Response
    )
    {   
        return this.authService.signUpHandler(dto,response)
    }
    
    @UseGuards(isLoggedIn)
    @HttpCode(200)
    @Post('signin')
    signIn(
        @Body() dto:signInDto,
        @Res({passthrough:true}) response : Response,
    ) 
    {
        return this.authService.signInHandler(dto, response)
    }

    @UseGuards(CookieJwtGuard)
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