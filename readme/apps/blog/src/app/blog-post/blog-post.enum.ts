

export enum SortByType {
  Date = 'createdAt',
  Likes = 'likes',
  Comments = 'comments',
}

export enum PostConstrains {
  MinTagLength = 3,
  MaxTagLength = 10,
  MaxTagsQuantity = 8,
  Space = ' '
}

export enum PostPagination {
  DefaultCountLimit = 25,
  DefaultPageCount =1
}


export enum PostError {
  NotFound = 'Post not  found',
  NoPermission = 'User has no permission to edit this post'
}


export enum SortDirection {
  Default ='desc',
  Desc ='desc',
  Asc = 'asc'
}






