import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      originalPostId: 1,
      isDraft: true,
      userId: 'user1',
      originalUserId: 'user1',
      postCategory: 'Link',
      link: {
        create: {
          linkURL: 'wwww.urllink.ru',
          linkDescription: 'just a sample of link to the video',
        }
      },
      comments: {
        create: [
          {
            userId: 'user1',
            commentText: "Thecomment from user1 for the post1"
          },
          {
            userId: 'user2',
            commentText: "The comment from user2 for the post1"
          }
        ]
      },
      tagsList: [
         'someTag1', 'someTag2', 'tag5', 'tag7'
        ]

    }
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      originalPostId: 2,
      isDraft: false,
      userId: 'user2',
      originalUserId: 'user2',
      postCategory: 'Text',
      text: {
        create: {
          postTitle: 'The title of the post',
          previewText: 'The preview text ',
          postText: 'The text of the post',
        }
      },
      comments: {
        create: [
          {
            userId: 'user5',
            commentText: "The comment from user5 for the post 2"
          },
          {
            userId: 'user7',
            commentText: "This comment from user7 for the post 2"
          }
        ]
      },
      tagsList: ['someTag3','someTag4'],
      }
    });
  await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      originalPostId: 3,
      isDraft: true,
      userId: 'user3',
      originalUserId: 'user3',
      postCategory: 'Quote',
      quote: {
        create: {
          quoteText: 'The quote itself',
          quoteAuthor: 'Omar Hayam',
        }
      },
      comments: {
        create: [
          {
            userId: 'user5',
            commentText: "This comment from user5 for publication 3"
          },
          {
            userId: 'user7',
            commentText: "This comment from user7 for publication 3"
          }
        ]
      },
      tagsList: [ 'someTag5',  'someTag6'   ]
    }
  });
  await prisma.post.upsert({
    where: { id: 4 },
    update: {},
    create: {
      originalPostId: 2,
      isDraft: false,
      userId: 'user2',
      originalUserId: 'user2',
      postCategory: 'Photo',
      photo: {
        create: {
          photoLink: 'www.photolink.ru',
        }
      },
      comments: {
        create: [
          {
            userId: 'user5',
            commentText: "The comment from user5 for the post 4"
          },
          {
            userId: 'user7',
            commentText: "This comment from user7 for the post 4"
          }
        ]
      },
      tagsList: ['someTag3','someTag4'],
      }
    });
    await prisma.post.upsert({
    where: { id: 5 },
    update: {},
    create: {
      originalPostId: 2,
      isDraft: false,
      userId: 'user2',
      originalUserId: 'user2',
      postCategory: 'Video',
      video: {
        create: {
          videoLink: 'www.videolink.ru',
          postTitle: 'some video'
        }
      },
      comments: {
        create: [
          {
            userId: 'user5',
            commentText: "The comment from user5 for the post 5"
          },
          {
            userId: 'user7',
            commentText: "This comment from user7 for the post 5"
          }
        ]
      },
      tagsList: ['someTag3','someTag4'],
      }
    });
    await prisma.post.upsert({
    where: { id: 6 },
    update: {},
    create: {
      originalPostId: 3,
      isDraft: false,
      userId: 'user3',
      originalUserId: 'user3',
      postCategory: 'Quote',
      quote: {
        create: {
          quoteText: 'The quote itself',
          quoteAuthor: 'Omar Hayam',
        }
      },
      comments: {
        create: [
          {
            userId: 'user5',
            commentText: "This comment from user5 for publication 6"
          },
          {
            userId: 'user7',
            commentText: "This comment from user7 for publication 6"
          }
        ]
      },
      tagsList: [ 'someTag5', 'someTag6'   ]
    }
  });
  console.info(' Database is filled by seeding');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
