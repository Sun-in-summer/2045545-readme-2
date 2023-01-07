import { Controller, HttpCode, HttpStatus, Post, Get, Param, Delete, Body, Patch, Query } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { ApiResponse} from '@nestjs/swagger';
import { CreatedCommentRdo } from './rdo/created-comment.rdo';
import { fillObject } from '@readme/core';
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
    return fillObject(CreatedCommentRdo, comment);
  }

  @Get('/:postId')
  @ApiResponse({
    type: CreatedCommentRdo,
    status: HttpStatus.OK,
    description: "Comment has been found"
  })
  public async showByPostId(
      @Param('postId') postId: number,
      @Query ('page') page: number,
      @Query ('commentsCount') commentsCount: number
  ){
    const existComments = await this.blogCommentService.getCommentsByPostId(postId, page, commentsCount);
    return fillObject(CreatedCommentRdo, existComments);
  }

  @Get('/comments/:commentId')
  @ApiResponse({
    type: CreatedCommentRdo,
    status: HttpStatus.OK,
    description: "Comment has been found"
  })
  public async getComment(@Param('commentId') commentId: number){
    const existComment = await this.blogCommentService.getComment(commentId);
    return fillObject(CreatedCommentRdo, existComment);
  }

  @Delete('/comments/:commentId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Comment has been deleted"
  })
  public async delete(@Param('commentId') commentId: number){
    return this.blogCommentService.delete(commentId);
  }

  @Patch('/comments/:commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Comment has been updated"
  })
  public async update(@Param('commentId') commentId: number, @Body() dto: CreateCommentDto){

   const updatedComment = await this.blogCommentService.update(commentId, dto );
    return fillObject(CreatedCommentRdo, updatedComment);
   }

}

