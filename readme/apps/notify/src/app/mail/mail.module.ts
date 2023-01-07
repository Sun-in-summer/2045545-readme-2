import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
      // template: {
      //   dir: __dirname + '/templates',
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  providers: [],
  controllers: [MailController],
  exports: [],
})
export class MailModule {}
