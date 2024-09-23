import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({type:mongoose.Schema.Types.ObjectId ,ref: 'Post', required: true })
  postId: string;

  @Prop({ type:mongoose.Schema.Types.ObjectId ,ref: 'User', required: true })
  addedBy: string;


}

export const CommentSchema = SchemaFactory.createForClass(Comment);
