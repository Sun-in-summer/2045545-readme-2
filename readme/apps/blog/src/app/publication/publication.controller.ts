import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('publication')
export class PublicationController {

  @Post('publish')
  @HttpCode(HttpStatus.CREATED)
  async create() {
    return {'title': 'Hello'} //
  }

}
