import { Controller} from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@readme/shared-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';




@Controller()
export class EmailSubscriberController {

  constructor (
    private readonly subscriberService: EmailSubscriberService,

  ){}

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async create (subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

}

