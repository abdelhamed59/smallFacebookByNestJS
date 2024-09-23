import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/core/schemas/comment.schema';
import { Post } from 'src/core/schemas/posts.schema';
import { commentsDTO, updateCommentDTO } from './comment.dto';
import { paramDTO, postsDTO } from '../posts/posts.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentsModel: Model<Comment>,
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) { }

    
    async addComment(body:commentsDTO,req:any,param:paramDTO){
        body.addedBy=req.user.userId
        body.postId=param.id
        const comment = await this.commentsModel.insertMany(body)
        const post= await this.postModel.findById({_id:param.id})
        post.comments.push(comment[0]._id.toString())
        await post.save()
        return({message:"comment added ",comment})
    }


    async updateComment(body:updateCommentDTO,req:any,param:paramDTO){
        const comment = await this.commentsModel.findById({_id:param.id})
        if (comment.addedBy!=req.user.userId) {
            throw new UnauthorizedException('only the comment writer can edit the comment ')
        } else {
            const update = await this.commentsModel.findByIdAndUpdate({ _id:param.id}, body , { new: true })
            return{message:"comment updated successfuly",update}
        }
    }

    async deleteComment(req:any,param:paramDTO){
    const comment = await this.commentsModel.findById({_id:param.id})
    const post=await this.postModel.findOne({comments:param.id})
    if (comment.addedBy!=req.user.userId&&post.addedBy!=req.user.userId) {
        throw new UnauthorizedException('only the comment writer can edit the comment or post admin')    
    } else {
        const deleted = await this.commentsModel.findByIdAndDelete({ _id:param.id })
       const post= await this.postModel.findOneAndUpdate(
            { comments: comment._id },  
            { $pull: { comments: comment._id } },
            {new:true}  
        );
        return({message:"comment deleted successfuly",post})
    }
    }

    async allCommentsForpost(param:paramDTO){
        const comments=await this.commentsModel.find({postId:param.id}).populate("postId","title content addedBy createdAt updatedAt")
        const count=comments.length
        return({message:"all comments",count,comments})
    }

    async myComments(req:any){
        const comments=await this.commentsModel.find({addedBy:req.user.userId}).select("-addedBy").populate("postId","title content addedBy createdAt updatedAt")
                const count=comments.length
        return({message:"my comments",count,comments})
    }
}
