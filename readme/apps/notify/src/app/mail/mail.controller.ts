import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Controller,  Post , Body, HttpStatus} from '@nestjs/common';
import { NotifyService } from './mail.service';
import { SendEmailDto } from '../dto/sendEmail.dto';



@ApiTags('notify')
@Controller('notify')
export class NotifyController {

  constructor (
    private readonly notifyService: NotifyService
  ){}

  @Post('/')
  @ApiResponse(
    {status: HttpStatus.OK, description: 'The emails were successfully sent out'}
  )
  async sendMail(@Body() dto: SendEmailDto){
  return  this.notifyService.sendMail({...dto});

  }
}
