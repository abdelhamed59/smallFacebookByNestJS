import { IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class postsDTO {
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    title: string;

    @MinLength(10)
    @MaxLength(200)
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsIn(['public', 'private'])
    status: string = 'public';


    addedBy: string
@IsOptional()
    comments:[string]

    
}

export class updatePostDTO {
    @IsOptional()
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    title: string;
    @IsOptional()
    @MinLength(10)
    @MaxLength(200)
    @IsString()
    content: string;
    @IsOptional()
    @IsString()
    @IsIn(['public', 'private'])
    status: string;
}


export class paramDTO{
    @IsMongoId()
    id:string
}