export interface Comment {
  commentText: string;
  postId: string;
  userId: string;
  commentId?: string;
  createdAt?: Date
}
