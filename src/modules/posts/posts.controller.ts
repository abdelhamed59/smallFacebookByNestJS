import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { paramDTO, postsDTO, updatePostDTO } from './posts.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private _postsService:PostsService){}

    @Post('addPost')
    addPost(@Body() body:postsDTO,@Req() req:any){
      return this._postsService.addPost(body,req)
    }

    @Get('allPosts')
    getPosts(){
        return this._postsService.getPosts()
    }

    @Get('myPosts')
    myPosts(@Req() req:any){
        return this._postsService.myPosts(req)
    }

    @Put('updatePost/:id')
    updatePost(@Body() body:updatePostDTO,@Req() req:any, @Param() param:paramDTO ){
        return this._postsService.updatePost(body,req,param)
    }

    @Delete('deletePost/:id')
    deletePost(@Req() req:any, @Param() param:paramDTO ){
        return this._postsService.deletePost(req,param)
    }

}
