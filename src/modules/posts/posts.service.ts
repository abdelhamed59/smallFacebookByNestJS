import {  Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/core/schemas/posts.schema';
import { paramDTO, postsDTO, updatePostDTO } from './posts.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) { }


    async addPost(body: postsDTO, req: any) {
        body.addedBy = req.user.userId
        const post = await this.postModel.insertMany(body)
        return { message: "post Added", post }
    }


    async getPosts() {
        const posts = await this.postModel.find({ status: "public" }).populate("comments","-_id -postId")
        return { message: " all posts ", count: posts.length, posts }
    }

    async myPosts(req: any) {
        const posts = await this.postModel.find({ addedBy: req.user.userId }).populate("comments","-_id -postId")
        return { message: " all posts ", count: posts.length, posts }
    }

    async updatePost(body: updatePostDTO, req: any, param: paramDTO) {
        let { title, content, status } = body;
        const post = await this.postModel.findOne({ _id: param.id })
        if(!post)  throw new NotFoundException('post deleted before')
        if (post.addedBy != req.user.userId) {
              throw new UnauthorizedException('only post admin can update post')
        } else {
            const update = await this.postModel.findByIdAndUpdate({ _id: param.id }, { title, content, status }, { new: true })
            return { message: " updated post successfuly",update }
        }
    }

    async deletePost( req: any, param: paramDTO) {
        const post = await this.postModel.findOne({ _id: param.id })
    if(!post)  throw new NotFoundException('post  deleted before')
        if (post.addedBy != req.user.userId) {
              throw new UnauthorizedException('only post admin can delete post')
        } else {
            const deleted = await this.postModel.findByIdAndDelete({ _id: param.id })
            return { message: "  post deleted successfuly" }
        }
    }
}
