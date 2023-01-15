import { CRUDRepository } from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Post , ExtendedPost } from '@readme/shared-types';
import { BlogPostQuery } from './query/blog-post.query';
import { SortByType } from './blog-post.constant';




@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
     const entityData = item.toObject();
     const contentData =entityData.postContent;
     const { postCategory, postId, ...content} = contentData;

     delete entityData.postContent;

     const post = await this.prisma.post.create({
      data: {
        ...entityData,
        originalPostId: postId,
        comments: {
          connect: []
        },
        [postCategory.toLowerCase()]: {
          create: {
             ...content
          }
        }

      },
      include: {
        comments: true,
        link: true,
        video: true,
        photo: true,
        quote: true,
        text: true,
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

  public  async findById(id: number): Promise< ExtendedPost | null > {
    const post =  await this.prisma.post.findFirst({
      where: {
        id
      },
      include: {
        comments: true,
        video: true,
        link: true,
        text: true,
        quote: true,
        photo: true,
      }
    });

    return {...post, postId: post.id};
  }

  public async find({limit, page, sortDirection, sortBy, userId, postCategory, tag}: BlogPostQuery): Promise<Post[]> {
    const posts =  await this.prisma.post.findMany({
      where:  (userId || postCategory || tag) ?  {
        isDraft: {
          equals: false
        },
        OR: [
          {
            userId
          },
          {
            postCategory
          },
          {
            tagsList: {
              has: tag ?? null
            }
          }
        ]} : {
          isDraft: {
            equals: false
        },
        },

      include: {
        comments: true,
        video: true,
        link: true,
        text: true,
        quote: true,
        photo: true,
      },
      take: limit,
      orderBy: [
        sortBy === SortByType.Comments
          ? {
            [sortBy] : {
              _count: sortDirection
            }
          }
          : {
            [sortBy] : sortDirection
          }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    // return posts.map((post) => extendPostByContent(post));
    return posts;
  }

  public async update(id: number, item: BlogPostEntity): Promise<Post> {
    const data = item.toObject();

      const contentData = data.postContent;
     const { postCategory, ...content} = contentData;
     delete data.postContent;
     delete data.postId;

     return  await  this.prisma.post.update({
       where: {
        id
      },
      data: {
        ...data,
        [postCategory.toLowerCase()]: {
          update: {
             ...content
          }
        },
        comments: {
          connect: []
        }
      }
     });
  }


  public async updateFromPost(id: number, item: BlogPostEntity): Promise<Post>{
    const data = item.toObject();
     delete data.postContent;
     delete data.postId;

     return  await  this.prisma.post.update({
       where: {
        id
      },
      data: {
        ...data
         ,
        comments: {
          connect: []
        }
      }
    });
  }
}
