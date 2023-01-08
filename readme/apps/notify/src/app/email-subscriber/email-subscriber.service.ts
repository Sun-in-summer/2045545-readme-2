import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constant';
import { MailService } from './mail/mail.service';
import { EmailSubscriberEntity } from './email-subscriber.entity';


@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly mailService: MailService,
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }


}
