import { CRUDRepository } from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Post } from '@readme/shared-types';


@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
     const entityData = item.toObject();
     const post = await this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true,
      }
    });
     return post;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      }
    });
  }

  public  async findById(id: number): Promise< Post | null > {
    return await this.prisma.post.findFirst({
      where: {
        id
      }
    });
  }

  public async find(ids: number[] = []): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public async update(id: number, item: BlogPostEntity): Promise<Post> {
    const data = item.toObject();
     return  await  this.prisma.post.update({
       where: {
        id
      },
      data: {
        ...data,
        id,
        comments: {
          connect: []
        }
      }
     });
  }
}
