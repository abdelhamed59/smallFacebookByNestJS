import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { signInDTO } from '../auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class SignInService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }
    async signIn(body: signInDTO) {
        const user = await this.userModel.findOne({ email: body.email })
        if (user && bcrypt.compareSync(body.password, user.password)) {
            let token= await this.jwtService.signAsync({email:user.email,userId:user._id},{secret:'userInfo'})
            return { message: "welcom",token }
        } else {
            return { message: "invalid email or password" }
        }

    }

}
