import { MailerOptions } from '@nestjs-modules/mailer';
import { registerAs } from '@nestjs/config';

export const mailOptions=  registerAs('mail', () => ({
  smtpServer: process.env.SMTP_SERVER,
  port: process.env.SMTP_SERVER_PORT,
  email: process.env.ADMIN_EMAIL,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
}));


export function getMailConfig(): MailerOptions {
  const configService =mailOptions();
  return {
    transport: {
      host: configService.smtpServer,
      port: +configService.port,
      secure: false,
      ignoreTLS: true,
    },
      defaults: {
        from: configService.email
      },
    }
}
