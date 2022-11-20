import {Comment} from '@readme/shared-types';

export class BlogCommentEntity implements Comment {
  public commentText: string;
  public postId: string;
  public userId: string;
  public commentId?: string;

}
