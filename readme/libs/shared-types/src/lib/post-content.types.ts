import {Prisma} from '@prisma/client';

  type Text = {
    postTitle: string;
    previewText: string;
    postText: string;
  }

  type Video = {
    postTitle: string;
    videoLink: string;
  }

  type Quote = {
   quoteText: string;
   quoteAuthor: string;
  }

  type Photo = {
      photoLink: string;
    }


  type  Link = {
    linkURL: string;
    linkDescription: string;
  }

  export type PostContent = Text | Video |Quote | Photo | Link | Prisma.JsonValue;

  export const PostTypeObject = {
    Video: 'Video',
    Text: 'Text',
    Quote: "Quote",
    Photo: "Photo",
    Link: "Link"
  } as const;

  export type PostType =keyof typeof PostTypeObject;
