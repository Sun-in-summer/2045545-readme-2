import { Controller, HttpCode, HttpStatus, Post, Get, Param, Delete, Body, Patch, Query, DefaultValuePipe, UseGuards, Req } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CreatedCommentRdo } from './rdo/created-comment.rdo';
import { fillObject } from '@readme/core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CommentsPagination } from './blog-comment.enum';

@ApiTags('comment')
@Controller('comment')///
export class BlogCommentController {

  constructor (
    private readonly blogCommentService: BlogCommentService
  ){}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The comment has been created successfully"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request is invalid!'
  })
  public async create(@Body() dto: CreateCommentDto, @Req() request) {
    const {user} =request;
    const {sub} = user;
    const userId= sub;
    const comment = await this.blogCommentService.create(dto, userId);
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
      @Query ('page', new DefaultValuePipe(CommentsPagination.DefaultPage)) page: number,
      @Query ('commentsCount', new DefaultValuePipe(CommentsPagination.CommentsCount)) commentsCount: number
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Comment has been deleted"
  })
   @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user is not logged in or is not an author of comment'
  })
  public async delete(@Param('commentId') commentId: number, @Req() request){
    const {user} =request;
    const {sub} = user;
    const userId= sub;
      return this.blogCommentService.delete(commentId, userId);
  }

  @Patch('/comments/:commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Comment has been updated"
  })
  public async update(@Param('commentId') commentId: number, @Body() dto: CreateCommentDto, @Req() request ){
    const {user} =request;
    const {sub} = user;
    const userId= sub;

   const updatedComment = await this.blogCommentService.update(commentId, dto, userId );
    return fillObject(CreatedCommentRdo, updatedComment);
   }

}

