import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { commentsDTO, updateCommentDTO } from './comment.dto';
import { paramDTO } from '../posts/posts.dto';

@Controller()
@UseGuards(AuthGuard)
export class CommentsController {
    constructor(private _commentsService: CommentsService) { }


    @Post('addComment/:id')
    addComment(@Body() body: commentsDTO, @Req() req: any, @Param() param: paramDTO) {
        return this._commentsService.addComment(body, req, param)
    }

    @Put('updateComment/:id')
    updateComment(@Body() body: updateCommentDTO, @Req() req: any, @Param() param: paramDTO) {
        return this._commentsService.updateComment(body, req, param)
    }

    @Delete('deleteComment/:id')
    deleteComment(@Req() req: any, @Param() param: paramDTO) {
        return this._commentsService.deleteComment(req, param)
    }

    @Get('allCommentsForpost/:id')
    allCommentsForpost(@Param() param: paramDTO) {
        return this._commentsService.allCommentsForpost(param)
    }

    @Get('myComments')
    myComments(@Req() req: any) {
        return this._commentsService.myComments(req)
    }
    
}