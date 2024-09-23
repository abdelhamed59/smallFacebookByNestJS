import { Body, Controller, Post } from '@nestjs/common';
import { signUpDTO } from '../auth.dto';
import { SignUpService } from './sign-up.service';

@Controller('auth')
export class SignUpController {

    constructor(private _signUpService:SignUpService){

    }
    @Post('signUp')
    signUp(@Body() body:signUpDTO){      
      return this._signUpService.signUp(body)
    }
}
