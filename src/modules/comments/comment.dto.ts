import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class commentsDTO {
  

    @MinLength(10)
    @MaxLength(200)
    @IsString()
    @IsNotEmpty()
    content: string;

 
    addedBy: string;

    postId:string;

}

export class updateCommentDTO {
    @MinLength(10)
    @MaxLength(200)
    @IsString()
    @IsNotEmpty()
    content: string;
}