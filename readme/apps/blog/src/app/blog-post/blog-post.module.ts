import { Module } from '@nestjs/common';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { BlogPostMemoryRepository } from './blog-post-memory.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostMemoryRepository],
  imports: [BlogCommentModule]
})
export class BlogPostModule {}
