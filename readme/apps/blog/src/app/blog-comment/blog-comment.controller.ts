import { Controller, HttpCode, HttpStatus, Post, Get, Param, Delete, Body, Patch} from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { ApiResponse} from '@nestjs/swagger';
import { CreatedCommentRdo } from './rdo/created-comment.rdo';
// import { fillObject, User } from '@readme/core';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')///
export class BlogCommentController {

  constructor (
    private readonly blogCommentService: BlogCommentService
  ){}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The comment has been created successfully"
  })
  public async create(@Body() dto: CreateCommentDto) {  //@Param('postId') postId: string?
    const comment = await this.blogCommentService.create(dto);
    // return fillObject(CreatedCommentRdo, comment);
    return comment;
  }

  @Get('/:postId')
  @ApiResponse({
    type: CreatedCommentRdo,
    status: HttpStatus.OK,
    description: "Comment has been found"
  })
  public async showByPostId(@Param('postId') postId: string){
    const id = parseInt(postId, 10);
    const existComments = await this.blogCommentService.getCommentsByPostId(id);
    // return fillObject(CreatedCommentRdo, existComment);
    return existComments;
  }

  @Get('/comments/:commentId')
  @ApiResponse({
    type: CreatedCommentRdo,
    status: HttpStatus.OK,
    description: "Comment has been found"
  })
  public async getComment(@Param('commentId') commentId: string){
    const id = parseInt(commentId, 10);
    const existComment = await this.blogCommentService.getComment(id);
    return existComment;
    // return fillObject(CreatedCommentRdo, existComment);
  }

  @Delete('/comments/:commentId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Comment has been deleted"
  })
  public async delete(@Param('commentId') commentId: string){
    const id = parseInt(commentId, 10);
    return this.blogCommentService.delete(id);
  }

  @Patch('/comments/:commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Comment has been updated"
  })
  public async update(@Param('commentId') commentId: string, @Body() dto: CreateCommentDto){
    const id = parseInt(commentId, 10);
   const updatedComment = await this.blogCommentService.update(id, dto );
    // return fillObject(CreatedCommentRdo, existComment);
    return updatedComment;
  }

}

