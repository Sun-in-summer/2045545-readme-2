import { Controller} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@readme/shared-types';
import { EmailPostService } from './email-post.service';




@Controller()
export class EmailPostController {

  constructor (
    private readonly postService: EmailPostService,

  ){}


  @EventPattern({cmd: CommandEvent.AddPosts})
  public async addPosts() {
    return this.postService.sendNewPosts();
  }

}

