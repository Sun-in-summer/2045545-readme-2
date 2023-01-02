export interface Comment {
  commentText: string;
  postId: number;
  userId: string;
  commentId?: string;
  createdAt?: Date
}
