import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true,versionKey:false})
export class User{
@Prop({type:String,required:true})
name:String;


@Prop({type:String,required:true})
email:string;

@Prop({type:String,required:true})
password:string;

@Prop({type:String,required:true})
phoneNumber:string;

@Prop({type:Number})
OTP:Number
}

export const UserSchema = SchemaFactory.createForClass(User);
