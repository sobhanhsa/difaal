import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private prisma:DataBaseService){}

    showProfileHandler(request: Request) {
        return request.user
    }
}
