import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      originalId: 1,
      isPublished: true,
      userId: 'user1',
      originalUserId: 'user1',
      type: 'Link',
      content: {
        linkURL: 'wwww.videolink.ru',
        linkDescription: 'just a sample of link to the video',
      },
      comments: {
        create: [
          {
            userId: 'user1',
            text: "Thecomment from user1 for the post #1"
          },
          {
            userId: 'user2',
            text: "The comment from user2 for the post #1"
          }
        ]
      },
      tags: {
        create: [
          {
            name: 'someTag#1',
          },
          {
            name: 'someTag#2',
          }
        ]
      }
    }
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      originalId: 2,
      isPublished: false,
      userId: 'user2',
      originalUserId: 'user2',
      type: 'Text',
      content: {
        postTitle: 'The title of the post',
        preview: 'The preview text ',
        postText: 'The text of the post',
      },
      comments: {
        create: [
          {
            userId: 'user5',
            text: "The comment from user5 for the post #2"
          },
          {
            userId: 'user7',
            text: "This comment from user7 for the post #2"
          }
        ]
      },
      tags: {
        create: [
          {
            name: 'someTag#3',
          },
          {
            name: 'someTag#4',
          }
        ]
      }
    }
  });
  await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      originalId: 3,
      isPublished: true,
      userId: 'user3',
      originalUserId: 'user3',
      type: 'Quote',
      content: {
        quoteText: 'The quote itself',
        quoteAuthor: 'Omar Hayam',
      },
      comments: {
        create: [
          {
            userId: 'user5',
            text: "This comment from user5 for publication #3"
          },
          {
            userId: 'user7',
            text: "This comment from user7 for publication #3"
          }
        ]
      },
      tags: {
        create: [
          {
            name: 'someTag#5',
          },
          {
            name: 'someTag#6',
          }
        ]
      }
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
