import { Module } from '@nestjs/common';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  imports: [BlogCommentModule],
  exports: [BlogPostRepository] ////
})
export class BlogPostModule {}
