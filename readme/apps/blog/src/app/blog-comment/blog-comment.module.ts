import { Module } from '@nestjs/common';
import { BlogCommentMemoryRepository } from './blog-comment-memory.repository';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';

@Module({
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentMemoryRepository],
  exports: [BlogCommentService, BlogCommentMemoryRepository]
})
export class BlogCommentModule {}
