import { Controller, HttpCode, HttpStatus, Post, Patch, Get, Param, Body, Delete} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { ApiResponse} from '@nestjs/swagger';
import { CreatedPostRdo } from './rdo/created-post.rdo';
import { fillObject } from '@readme/core';
import { BlogCommentService } from '../blog-comment/blog-comment.service';
import { CreatePostDto } from './dto/create-post.dto';


@Controller('post')
export class BlogPostController {

  constructor (
    private readonly blogPostService: BlogPostService,
    private readonly blogCommentService: BlogCommentService
  ){}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create( @Body()dto: CreatePostDto ) {  //@User('userId') userId: string
    const post = await this.blogPostService.create(dto);
    return fillObject(CreatedPostRdo, post);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Posts has been found"
  })
  async showAllPosts(){
    const existPosts = await this.blogPostService.show();
    return fillObject(CreatedPostRdo, existPosts)
  }

  @Get('/:postId')
  @ApiResponse({
    type: CreatedPostRdo,
    status: HttpStatus.OK,
    description: "Post has been found"
  })
  async show(@Param('postId') postId: number){
    const existPost = await this.blogPostService.getPost(postId);
    return fillObject(CreatedPostRdo, existPost);

  }


  @Patch('/:postId')
  @ApiResponse({
    type: CreatePostDto,
    status: HttpStatus.OK,
    description: 'Post has been updated'
  })
  async update(
    @Param('postId') postId: number,
    @Body() dto: CreatePostDto ) {
    const updatedPost = await this.blogPostService.update(postId, dto );

    return fillObject(CreatedPostRdo, updatedPost);
  }

  @Delete('/:postId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been deleted'
  })
  async delete(@Param('postId') postId: number): Promise <void>{
    await this.blogPostService.delete(postId);

  }

  @Post('/:postId/repost')
  @ApiResponse({
   status: HttpStatus.OK,
   description: 'Post has been reposted'
  })
  async repost(@Param('postId') postId: number){
      const post = await this.blogPostService.repost(postId);
      return fillObject(CreatedPostRdo, post);
  }



}

