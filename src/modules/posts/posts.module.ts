import { PostSchema } from './../../core/schemas/posts.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post } from 'src/core/schemas/posts.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports:[MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    providers:[PostsService,JwtService],
    controllers:[PostsController]
})
export class PostsModule {}
