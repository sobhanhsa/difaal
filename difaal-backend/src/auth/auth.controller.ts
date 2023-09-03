import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { signUpDto } from "./dto";

@Controller()
export class AuthController {
    
    @HttpCode(201)
    @Post('signup')
    signUp (@Body() dto:signUpDto) {

    }

}