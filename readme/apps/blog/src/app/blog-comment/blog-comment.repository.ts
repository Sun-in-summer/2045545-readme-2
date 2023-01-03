import { CRUDRepository } from '@readme/core';
import { Comment } from '@readme/shared-types';
import { BlogCommentEntity } from './blog-comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogCommentRepository implements CRUDRepository<BlogCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: BlogCommentEntity): Promise<Comment> {
    const {commentText, postId, userId} = item.toObject();
    return this.prisma.comment.create({
      data: {
        commentText,
        userId,
        post: {
          connect: { id: postId }
        }
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id,
      }
    });
  }

  public findById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        id
      }
    });
  }

  public find(id: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        postId: id
      }
    });
  }

  public update(id: number, item: BlogCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        id
      },
      data: { ...item.toObject(), id }
    });
  }
}
