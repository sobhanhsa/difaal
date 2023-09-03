import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CookieJwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(CookieJwtGuard)
    @Get('profile')
    showUserProfile(@Req() req:Request) {
        return this.userService.showProfileHandler(req);
    }

    

}
