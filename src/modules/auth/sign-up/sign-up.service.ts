import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { signUpDTO } from '../auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async signUp(body:signUpDTO){
      const foundedUser=await this.userModel.findOne({email:body.email})
      if(foundedUser){
        return {message:"user already exist , please signIn "}
      }else{
        body.password = await bcrypt.hash(body.password, 8);
        const added=await this.userModel.insertMany(body)
        return {mesaage:"user Added",added}
      }
       
        
    }
}
