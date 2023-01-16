import { Entity } from '@readme/core';
import { EmailPost } from '@readme/shared-types';


export class EmailPostEntity implements Entity<EmailPostEntity>, EmailPost {
  public id: string;
  public postId: string;

  constructor(emailPost: EmailPost) {
    this.fillEntity(emailPost);
  }

  public fillEntity(entity) {
    this.id = entity.id ?? '';
    this.postId = entity.postId;
  }

  public toObject():EmailPostEntity {
    return {...this};
  }
}
