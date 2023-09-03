import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserService {
    showProfileHandler(request: Request) {
        return request.user
    }
}
