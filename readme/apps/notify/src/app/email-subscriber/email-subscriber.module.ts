import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailSubscriberModel.name,
        schema: EmailSubscriberSchema
      }
    ]),
    MailModule
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ],
  controllers: [EmailSubscriberController],
  exports: [    EmailSubscriberService,
    EmailSubscriberRepository,],
})
export class EmailSubscriberModule {}
