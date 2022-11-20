import { Module } from '@nestjs/common';
import { BlogPostMemoryRepository } from './blog-post-memory.repository';

@Module({
  imports: [],
  providers: [BlogPostMemoryRepository],
  exports: [BlogPostMemoryRepository],
})
export class BlogPostModule {}
