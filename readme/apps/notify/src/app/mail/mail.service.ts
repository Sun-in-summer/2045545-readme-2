import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { SendEmailDto } from '../dto/sendEmail.dto';


@Injectable()
export class NotifyService {
  constructor(private readonly mailerService: MailerService) {}

  public sendMail(dto: SendEmailDto)   {

     return this.mailerService.sendMail({
        to: dto.to ,
        from: dto.from,
        subject: dto.subject,
        text: dto.text,
        html: dto.html,
    })
 }
}
