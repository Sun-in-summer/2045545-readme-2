export const POST_NOT_FOUND ='Post not  found';
export const NO_PERMISSION = 'User has no permission to edit this post';
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_PAGE_COUNT= 1;

export enum SortByType {
  Date = 'createdAt',
  Likes = 'likes',
  Comments = 'comments',
}

export const SortTypeMap = {
  'likes': {
    likes: 'desc'
  },
  'comments': {
    comments: {
      _count: 'desc'
    }
  },
  'date': {
    date: 'desc'
  }
}

