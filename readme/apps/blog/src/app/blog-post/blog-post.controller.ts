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
    // return fillObject(CreatedPostRdo, post);
    return post;
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Posts has been found"
  })
  async showAllPosts(){
    const existPosts = await this.blogPostService.show();
    // return fillObject(CreatedPostRdo, existPosts)
    return existPosts;
  }

  @Get('/:postId')
  @ApiResponse({
    type: CreatedPostRdo,
    status: HttpStatus.OK,
    description: "Post has been found"
  })
  async show(@Param('postId') postId: string){
    const existPost = await this.blogPostService.getPost(postId);
    // return fillObject(CreatedPostRdo, existPost);
    return existPost;
  }


  @Patch('/:postId')
  @ApiResponse({
    type: CreatePostDto,
    status: HttpStatus.OK,
    description: 'Post has been updated'
  })
  async update(
    @Param('postId') postId: string,
    @Body() dto: CreatePostDto ) {
    const id = parseInt(postId, 10);
    const updatedPost = await this.blogPostService.update(id, dto );
    return updatedPost;
    // return fillObject(CreatedPostRdo, updatedPost);
  }

  @Delete('/:postId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been deleted'
  })
  async delete(@Param('postId') postId: string): Promise <void>{
    const id = parseInt(postId, 10);
    await this.blogPostService.delete(id);
    // await this.blogCommentService.deleteByPostId(postId);

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

