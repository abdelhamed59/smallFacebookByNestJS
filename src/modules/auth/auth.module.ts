import { Module } from '@nestjs/common';
import { SignInService } from './sign-in/sign-in.service';
import { SignUpService } from './sign-up/sign-up.service';
import { SignInController } from './sign-in/sign-in.controller';
import { SignUpController } from './sign-up/sign-up.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../core/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { PasswordController } from './password/password.controller';
import { PasswordService } from './password/password.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers:[SignInController,SignUpController,PasswordController],
    providers:[SignUpService, SignInService,JwtService,PasswordService]

})
export class AuthModule {}
