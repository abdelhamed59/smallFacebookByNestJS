import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  })
  status: string;

  @Prop({ type:mongoose.Schema.Types.ObjectId ,ref: 'User', required: true })
  addedBy: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' })
  comments: [string];

//   @Prop({ type: [Types.ObjectId], ref: 'Like' })
//   likes: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
