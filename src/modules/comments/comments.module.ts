import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/core/schemas/comment.schema';
import { Post, PostSchema } from 'src/core/schemas/posts.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
],
  controllers: [CommentsController],
  providers: [CommentsService,JwtService]
})
export class CommentsModule {}
