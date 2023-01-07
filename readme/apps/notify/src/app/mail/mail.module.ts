import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { getMailConfig } from 'apps/notify/config/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig()),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [],
})
export class MailModule {}
