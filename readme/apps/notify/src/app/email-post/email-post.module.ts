import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { EmailPostService } from './email-post.service';
import { EmailPostRepository } from './email-post.repository';
import { EmailPostModel, EmailPostSchema } from './email-post.model';
import { EmailPostController } from './email-post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailPostModel.name,
        schema: EmailPostSchema
      }
    ]),
    MailModule,
    EmailSubscriberModule,
    ],
  providers: [
    EmailPostService,
    EmailPostRepository

  ],
  controllers: [EmailPostController],
  exports: [],
})
export class EmailSubscriberModule {}
