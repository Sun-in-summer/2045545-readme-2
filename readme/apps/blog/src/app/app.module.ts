import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostModule } from './blog-post/blog-post.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [BlogPostModule, PublicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
