import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class publishAdDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    title:string
    
    @IsArray()
    photos:string
    
    @IsString()
    @IsNotEmpty()
    description:string

    @IsString()
    @IsNotEmpty()
    category:string

}