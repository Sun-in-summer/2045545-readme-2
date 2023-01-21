import { Controller, HttpCode, HttpStatus, Post, Patch, Get, Param, Body, Delete, Query, UseGuards, Req} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { ApiBearerAuth, ApiResponse} from '@nestjs/swagger';
import { CreatedPostRdo } from './rdo/created-post.rdo';
import { fillObject } from '@readme/core';
import { BlogCommentService } from '../blog-comment/blog-comment.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostQuery } from './query/blog-post.query';
import { RepostPostDto } from './dto/repost.dto';
import { NotifyUserDto } from './dto/notify-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';



@Controller('post')
export class BlogPostController {

  constructor (
    private readonly blogPostService: BlogPostService,
    private readonly blogCommentService: BlogCommentService
  ){}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  async create( @Body()dto: CreatePostDto, @Req() request ) {
    const {user} =request;
    const {sub} = user;
    const userId = sub;
    const post = await this.blogPostService.create(dto, userId);

    return fillObject(CreatedPostRdo, post);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Posts has been found"
  })
  async showAllPosts(@Query () query: BlogPostQuery){
    const posts = await this.blogPostService.getPosts(query);
    return fillObject(CreatedPostRdo, posts)
  }


  @Patch('/:postId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: CreatePostDto,
    status: HttpStatus.OK,
    description: 'Post has been updated'
  })
  async update(
    @Req() request,
    @Param('postId') postId: number,
    @Body() dto: CreatePostDto ) {

    const {user} =request;


    const updatedPost = await this.blogPostService.update(user, postId, dto );

    return fillObject(CreatedPostRdo, updatedPost);
  }

  @Delete('/:postId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post has been deleted'
  })
  async delete(@Req() request, @Param('postId') postId: number): Promise <void>{
    const {user} =request;

    await this.blogPostService.delete(user, postId);

  }

  @Post('/:postId/repost')
  @ApiResponse({
   status: HttpStatus.OK,
   description: 'Post has been reposted'
  })
  async repost(@Param('postId') postId: number, @Body() dto: RepostPostDto){
      const post = await this.blogPostService.repost(postId, dto);
      return fillObject(CreatedPostRdo, post);
  }

  @Patch(':postId/like')
  @ApiResponse({
    type: CreatePostDto,
    status: HttpStatus.OK,
    description: 'The like is added / removed'
  })
  @HttpCode(HttpStatus.OK)
  async addLike(
    @Param('postId') postId: number,
    @Body() dto: RepostPostDto
  ) {
    const post = await this.blogPostService.changeLikesCount(postId, dto.userId);
    return fillObject(CreatedPostRdo, post);
  }


  @Get('/notify')
  public async notifyUser(@Body() dto: NotifyUserDto) {
    this.blogPostService.notify(dto.email);
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


}

