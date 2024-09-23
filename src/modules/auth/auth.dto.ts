import {  IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class signUpDTO{
     
    @MinLength(4)
    @MaxLength(15)
    @IsString()
    @IsNotEmpty()    
    name:string;

    @IsEmail()
    @IsNotEmpty() 
    email:string;

    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    @IsNotEmpty()
    phoneNumber:string;

   
    @IsNotEmpty() 
    @IsStrongPassword()
    password:string;
}


export class signInDTO{
     
    @IsEmail()
    @IsNotEmpty() 
    email:string;

    @IsNotEmpty() 
    password:string;
}

export class otpDTO{
    @IsEmail()
    @IsNotEmpty() 
    email:string;
}

export class passwordDTO{
    @IsNumber()
    @IsNotEmpty()
    OTP:Number;
    @IsNotEmpty() 
    @IsStrongPassword()
    newPassword:string;
}

export class updatepasswordDTO{
    @IsOptional()
    oldPassword:string;
    @IsOptional() 
    @IsStrongPassword()
    newPassword:string;
    @MinLength(4)
    @MaxLength(15)
    @IsString()
    @IsOptional()    
    name:string;

    @IsEmail()
    @IsOptional() 
    email:string;

    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    @IsOptional()
    phoneNumber:string;
}