import { Module } from '@nestjs/common';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { RABBITMQ_SERVICE } from './blog-post.constant';
import {ClientsModule} from '@nestjs/microservices';
import {ConfigService} from '@nestjs/config';
import { getRabbitMqConfig } from '../config/rabbitmq.config';

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  imports: [
    BlogCommentModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      },
      ])
  ],
  exports: [BlogPostRepository]

})
export class BlogPostModule {}
