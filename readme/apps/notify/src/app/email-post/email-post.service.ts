import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { MailService } from '../mail/mail.service';
import { EmailPostRepository } from './email-post.repository';



@Injectable()
export class EmailPostService {
  constructor(
    private readonly mailService: MailService,
    private readonly emailPostRepository: EmailPostRepository,
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}


   public async sendNewPosts() {
    const users = await this.emailSubscriberRepository.find();
    const emails: string[] = users.map((user) => user.email);

    const posts = await this.emailPostRepository.find();
    return this.mailService.sendNewPostNotification(emails, posts);
  }


}
