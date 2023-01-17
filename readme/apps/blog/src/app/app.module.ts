import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtOptions } from './config/jwt.config';
import { rabbitMqOptions } from './config/rabbitmq.config';


@Module({
  imports: [
    PrismaModule,
    BlogPostModule,
    BlogCommentModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions, jwtOptions],
    })
  ],
  controllers: [],
  providers: [
    JwtStrategy////
  ],
})
export class AppModule {}
