import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Controller,  Get , Body, HttpStatus} from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from '../dto/sendEmail.dto';



@ApiTags('notify')
@Controller('notify')
export class MailController {

  constructor (
    private readonly notifyService: MailService
  ){}

  @Get('/')
  @ApiResponse(
    {status: HttpStatus.OK, description: 'The emails were successfully sent out'}
  )
  async sendMail(@Body() dto: SendEmailDto){
  return  this.notifyService.sendMail({...dto});

  }
}
