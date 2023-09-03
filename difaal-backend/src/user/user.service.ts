import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Request } from 'express';
import { DataBaseService } from 'src/database/database.service';
import { updateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma:DataBaseService){}

    showProfileHandler(request: Request) {
        return request.user
    }

    async updateUserProfile( { id } , dto : updateUserDto) {

        try {
            const updatedUser = await this.prisma.user.update({
            where: {
                id:id,
            },
            data: {
                ...dto
            }})

            delete updatedUser.hash

            return updatedUser

        } catch(e) {
            if ((e instanceof Prisma.PrismaClientKnownRequestError) && (e.code === "P2002")) {            
                throw new ForbiddenException(
                        "taken email",
                        e.message
                    );
            }
            
            throw e
        }

    }

}
