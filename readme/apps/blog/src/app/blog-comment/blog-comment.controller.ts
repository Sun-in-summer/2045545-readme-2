import { Controller, HttpCode, HttpStatus, Post, Get, Param, Delete, Body, Patch} from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { ApiResponse} from '@nestjs/swagger';
import { CreatedCommentRdo } from './rdo/created-comment.rdo';
import { fillObject, User } from '@readme/core';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')///
export class BlogCommentController {

  constructor (
    private readonly blogCommentService: BlogCommentService
  ){}

  @Post(':postId')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The comment has been created successfully"
  })
  public async create(@Body() dto: CreateCommentDto) {  //@Param('postId') postId: string?
    const comment = await this.blogCommentService.create(dto);
    return fillObject(CreatedCommentRdo, comment);


  }

  @Get(':postId')
  @ApiResponse({
    type: CreatedCommentRdo,
    status: HttpStatus.OK,
    description: "Comment has been found"
  })
  public async showByPostId(@Param('postId') postId: number){
    const existComment = await this.blogCommentService.getCommentsByPostId(postId);
    return fillObject(CreatedCommentRdo, existComment);
  }

  @Get(':postId/:commentId')
  @ApiResponse({
    type: CreatedCommentRdo,
    status: HttpStatus.OK,
    description: "Comment has been found"
  })
  public async getComment(@Param('commentId') commentId: string){
    const existComment = await this.blogCommentService.getComment(commentId);
    return fillObject(CreatedCommentRdo, existComment);
  }

  @Delete(':commentId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Comment has been deleted"
  })
  public async delete(@Param('commentId') commentId:string, @User() userId: string){
    return this.blogCommentService.delete(commentId, userId)
  }

  @Patch(':commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Comment has been updated"
  })
  public async update(@Param('commentId') commentId:string, @Body() dto: CreateCommentDto,  @User() userId: string){
   const existComment = await this.blogCommentService.update(commentId, userId, dto );
    return fillObject(CreatedCommentRdo, existComment);
  }

}

