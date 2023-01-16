import { CRUDRepository } from '@readme/core';
import { EmailPost } from '@readme/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailPostEntity } from './email-post.entity';
import { EmailPostModel } from './email-post.model';

@Injectable()
export class EmailPostRepository implements CRUDRepository<EmailPostEntity, string, EmailPost> {
  constructor(
    @InjectModel(EmailPostModel.name) private readonly emailPostModel: Model<EmailPostModel>
  ) {}

  public async create(item: EmailPostEntity): Promise<EmailPost> {
    const newEmailPost= new this.emailPostModel(item);
    return newEmailPost.save();
  }

  public async destroy(id: string): Promise<void> {
    this.emailPostModel.deleteOne({ id });
  }

  public async find(): Promise<EmailPost[]> {
    return this.emailPostModel
    .find()
    .exec();
  }

  public async findById(id: string): Promise<EmailPost | null> {
    return this.emailPostModel
        .findOne({ id })
        .exec();
  }

  public async update(id: string, item: EmailPostEntity): Promise<EmailPost> {
    return this.emailPostModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<EmailPost | null> {
    return this.emailPostModel
      .findOne({ email })
      .exec()
  }


}
