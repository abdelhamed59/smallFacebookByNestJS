import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { signInDTO } from '../auth.dto';

@Controller('auth/signIn')
export class SignInController {
    constructor(private _signInService:SignInService){}

    @Post()
    signIn(@Body() body:signInDTO){
        return this._signInService.signIn(body)

    }
}
