import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Comment } from '@readme/shared-types';
import { BlogCommentRepository} from './blog-comment.repository'
import { BlogCommentEntity } from './blog-comment.entity';
import {  CreateCommentDto } from './dto/create-comment.dto';
import { CommentError } from './blog-comment.enum';


@Injectable()
export class BlogCommentService {

  constructor (
    private readonly blogCommentRepository: BlogCommentRepository
  ){}

  async create(dto: CreateCommentDto, userId: string): Promise <Comment> {

    const commentEntity = new BlogCommentEntity({...dto, userId});

    return this.blogCommentRepository.create(commentEntity);

  }

  async update (commentId: number,  dto: CreateCommentDto, userId: string ): Promise <Comment> {
     const existComment = await this.blogCommentRepository.findById(commentId);

          if(!existComment) {
      throw new NotFoundException(CommentError.NotFound)
     }

     if (existComment.userId !== userId) {
      throw new UnauthorizedException(CommentError.NoPermission);
     }

     const updatedData =await new BlogCommentEntity({...existComment, ...dto});

     return this.blogCommentRepository.update(commentId, updatedData);

  }

  async delete (commentId: number, userId: string): Promise <void> {
    const existComment = await this.blogCommentRepository.findById(commentId);
    if (!existComment) {
     throw new NotFoundException(CommentError.NotFound);
    }
     if (existComment.userId !== userId ){
      throw new UnauthorizedException(CommentError.NoPermission);
    }
    this.blogCommentRepository.destroy(commentId);
  }




  async getComment(commentId: number): Promise <Comment> {
    return  this.blogCommentRepository.findById(commentId);

  }

  async getCommentsByPostId(postId: number, page?: number, commentsCount?: number) : Promise <Comment[]> {
    return  this.blogCommentRepository.find(postId, page, commentsCount);

  }

  async deleteByPostId (postId: number): Promise <void> {
    const comments = await this.getCommentsByPostId(postId);
    comments.forEach((comment) => this.blogCommentRepository.destroy(comment.commentId));
  }

  async updateComment(commentId: number, dto: CreateCommentDto) : Promise <Comment> {
   const existComment = await this.blogCommentRepository.findById(commentId);

    if (!existComment) {
     throw new NotFoundException(CommentError.NotFound);
    }
    if (existComment.userId !== dto.userId ){
      throw new UnauthorizedException(CommentError.NoPermission);
    }
      return this.blogCommentRepository.update(commentId, new BlogCommentEntity(dto));
  }

}

