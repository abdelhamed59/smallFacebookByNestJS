import { Injectable, Body } from '@nestjs/common';
import { otpDTO, passwordDTO, updatepasswordDTO } from '../auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/core/schemas/user.schema';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mailerService: MailerService,
  ) { }

  async forgetPassword(body: otpDTO) {
    const code = Math.floor(100000 + Math.random() * 900000); // OTP code should be 6 digits, not 9
    const user = await this.userModel.findOne({ email: body.email });

    if (!user) {
      return { message: 'Account not found, please check your email' };
    } else {
      user.OTP = code; // Assuming OTP is a field in the user schema
      await user.save();

      // Send email with the OTP
      await this.mailerService.sendMail({
        from: '"Hello friend " <abdelhamedelkholy59@gmail.com>', // sender address
        to: body.email, // recipient email
        subject: 'Your OTP Code', // Subject line
        text: `hello ${user.name}`, // Plain text body
        html: `<h1> hello ${user.name}</h1>
             <h3>Your OTP code is ${code}</h3>`, // HTML body
      });

      return { message: 'OTP has been sent to your email' };
    }
  }

  async returnPassword(body: passwordDTO) {
    const user = await this.userModel.findOne({ OTP: body.OTP })
    if (!user) {
      return { message: "invalid OTP" }
    } else {
      user.password = bcrypt.hashSync(body.newPassword, 8)
      user.OTP = undefined
      await user.save()
      return { message: "success please signIn", user }

    }
  }

  async updatePassword(body: updatepasswordDTO, req: any) {
    const user = await this.userModel.findById({ _id: req.user.userId})
    user.name=body.name||user.name;
    user.email=body.email||user.email;
    user.phoneNumber=body.phoneNumber||user.phoneNumber
    
    if(body.oldPassword&&body.newPassword){
    if (!bcrypt.compareSync(body.oldPassword, user.password)) {
      return { message: "invalid password" }
    }else{
      user.password= bcrypt.hashSync(body.newPassword, 8)
    }
  }
  await user.save()
  return {message:"date updated successfuly",user}
}

async userData(req:any){
  const user=await this.userModel.findById({_id:req.user.userId}).select("name phoneNumber email -_id")
  return {message:"User Data",user}
}

}
