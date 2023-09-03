import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CookieJwtGuard } from 'src/auth/guard';
import { updateUserDto } from './dto';
import { UserParamDecorator } from './decorator';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(CookieJwtGuard)
    @Get('me')
    showUserProfile(@Req() req:Request) {
        return this.userService.showProfileHandler(req);
    }

    @UseGuards(CookieJwtGuard)    
    @Patch('me')
    updataUserInfo(
        @UserParamDecorator("id") userId:number,
        @Body() dto     : updateUserDto
    ) {
        return this.userService.updateUserProfile({id:userId},dto)
    }






}
