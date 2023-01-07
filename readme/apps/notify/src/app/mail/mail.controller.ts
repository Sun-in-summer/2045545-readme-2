import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Controller,  Get , Body, HttpStatus, Inject} from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from '../dto/sendEmail.dto';
import { ConfigType } from '@nestjs/config';
import { mailOptions } from 'apps/notify/config/mail.config';



@ApiTags('mail')
@Controller('mail')
export class MailController {

  constructor (
    private readonly notifyService: MailService,

    @Inject(mailOptions.KEY)
    private readonly mailConfig: ConfigType<typeof mailOptions>
  ){}

  @Get('/')
  @ApiResponse(
    {status: HttpStatus.OK, description: 'The emails were successfully sent out'}
  )
  async sendMail(@Body() dto: SendEmailDto){
  return  this.notifyService.sendMail({...dto});

  }
}
