import { Injectable } from '@nestjs/common';
import { Comment } from '@readme/shared-types';
import { BlogCommentMemoryRepository} from './blog-comment-memory.repository'
import { BlogCommentEntity } from './blog-comment.entity';
import {  CreateCommentDto } from './dto/create-comment.dto';
import { NO_PERMISSION, COMMENT_NOT_FOUND } from './blog-comment.constant';


@Injectable()
export class BlogCommentService {

  constructor (
    private readonly blogCommentRepository: BlogCommentMemoryRepository
  ){}

  async create(dto: CreateCommentDto) {

    const {commentText, postId} = dto;

    const blogComment = {
      postId,
      userId: '',
      commentId: '',
      commentText,
    }

    const commentEntity = new BlogCommentEntity(blogComment);

    return this.blogCommentRepository.create(commentEntity);

  }

  async update (commentId: string, userId: string, dto: CreateCommentDto ): Promise <Comment> {
     const existComment = await this.blogCommentRepository.findById(commentId);

     if(!existComment) {
      throw new Error (COMMENT_NOT_FOUND)
     }

     if (existComment.userId !== userId) {
      throw new Error (NO_PERMISSION);
     }

     const updatedData =await new BlogCommentEntity({...existComment, ...dto});

     return this.blogCommentRepository.update(commentId, updatedData);

  }

  async delete (commentId: string, userId: string): Promise <void> {
    const existComment = await this.blogCommentRepository.findById(commentId);
    if (!existComment) {
      throw new Error(COMMENT_NOT_FOUND);
    }
    if (existComment.userId !== userId ){
      throw new Error (NO_PERMISSION);
    }
    this.blogCommentRepository.destroy(commentId);
  }



  async show (): Promise <Comment[]>{
    return await this.blogCommentRepository.index();
  }

  async getComment(commentId: string): Promise <Comment> {
    return await this.blogCommentRepository.findById(commentId);

  }

  async getCommentsByPostId(postId: number) : Promise <Comment[]> {
    const comments =await this.blogCommentRepository.index();
    const commentsByPostId = comments.filter((item)=> item.postId === postId);
    return commentsByPostId;
  }

  async deleteByPostId (postId: number): Promise <void> {
    const comments = await this.getCommentsByPostId(postId);
    comments.forEach((comment) => this.blogCommentRepository.destroy(comment.commentId));
  }

}

