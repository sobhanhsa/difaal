import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class signUpDto {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsEmail()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string

}