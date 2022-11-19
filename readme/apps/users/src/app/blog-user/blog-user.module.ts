import { Module } from '@nestjs/common';
import { BlogUserMemoryRepository } from './blog-user-memory.repository';

@Module({
  imports: [],
  providers: [BlogUserMemoryRepository],
  exports: [BlogUserMemoryRepository],
})
export class BlogUserModule {}
