import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name:string

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email:string    

}