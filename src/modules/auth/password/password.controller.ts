import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { otpDTO, passwordDTO, updatepasswordDTO } from '../auth.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller()
export class PasswordController {
    constructor(private _passwordService: PasswordService) { }

    @Get('auth/forgetPassword')
    forgetPassword(@Body() body: otpDTO) {
        return this._passwordService.forgetPassword(body)
    }
    @Post('auth/returnPassword')
    returnPassword(@Body() body: passwordDTO) {
        return this._passwordService.returnPassword(body)
    }
    @Put('auth/updatePassword')
    @UseGuards(AuthGuard)
    updatePassword(@Body() body: updatepasswordDTO, @Req() req:any ) {
        return this._passwordService.updatePassword(body,req)
    }

    @Get('auth/userData')
    @UseGuards(AuthGuard)
    userData(@Req() req:any){
        return this._passwordService.userData(req)
    }
}
