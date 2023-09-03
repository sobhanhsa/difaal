import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateUserDto {
    
    @IsString()
    @IsNotEmpty()
    name:string

 
    @IsEmail()
    @IsNotEmpty()
    email:string    

}