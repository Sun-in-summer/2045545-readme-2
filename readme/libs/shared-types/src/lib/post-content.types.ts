
  type Text ={
    postTitle: string;
    previewText: string;
    postText: string;
  }

  type Video ={
    postTitle: string;
    videoLink: string;
  }

  type Quote = {
   quoteText: string;
   quoteAuthor: string;
  }

  type Photo ={
      photoLink: string;
    }


  type  Link ={
    linkUPL: string;
    linkDescription: string;
  }

  export type Content = Text | Video |Quote | Photo | Link
