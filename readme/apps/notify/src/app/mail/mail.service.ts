import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { SendEmailDto } from '../dto/sendEmail.dto';
import {SentMessageInfo} from 'nodemailer';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(dto: SendEmailDto): Promise<SentMessageInfo>   {

     return  this.mailerService.sendMail({
        to: dto.to ,
        from: dto.from,
        subject: dto.subject,
        text: dto.text,
        html: dto.html,
    })
 }
}
