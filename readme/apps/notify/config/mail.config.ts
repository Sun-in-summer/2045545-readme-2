import {MailerAsyncOptions} from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService , registerAs} from '@nestjs/config';

export const mailOptions=  registerAs('mail', () => ({
  smtpServer: process.env.SMTP_SERVER,
  port: process.env.SMTP_SERVER_PORT,
  email: process.env.ADMIN_EMAIL,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
}));


export function getMailConfig(): MailerAsyncOptions {

  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
      host: configService.get<string>('mail.smtpServer'),
      port: configService.get<number>('mail.port'),
      secure: false,
      ignoreTLS: true,
    },
      defaults: {
        from: configService.get<string>('mail.email')
      },

    }),
    inject: [ConfigService]

  }
}
