import { Module } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';

@Module({
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository],
  exports: [BlogCommentService, BlogCommentRepository]
})
export class BlogCommentModule {}
