import {ApiProperty} from '@nestjs/swagger';


export class CreateVideoPostDto {
  @ApiProperty({
    description: 'The title of the post.',
    required: true,
  })
  public postTitle: string;

  @ApiProperty({
    description: 'The link to the video.',
    required: true,
  })
  public videoLink: string;

  @ApiProperty({
    description: 'The list of the tags.',
  })
  public tagList?: string[];
}



  export class CreateTextPostDto {
    @ApiProperty({
    description: 'The title of the post.',
    required: true,
    })
    public postTitle: string;

    @ApiProperty({
      description: 'The text of the post.',
      required: true,
    })
    public postText: string;

    @ApiProperty({
      description: 'The preveiw text of the post.',
      required: true,
    })
    public previewText: string;

    @ApiProperty({
      description: 'The list of the tags.',
    })
    public tagList?: string[];
  }

  export class CreateQuotePostDto {
    @ApiProperty({
    description: 'The quote.',
    required: true,
    })
    public quoteText: string;

    @ApiProperty({
      description: 'The author of the  quote',
      required: true,
    })
    public quoteAuthor: string;


    @ApiProperty({
      description: 'The list of the tags.',
    })
    public tagList?: string[];
  }

  export class CreatePhotoPostDto {
    @ApiProperty({
      description: 'The link to the photo',
      required: true,
    })
    public photoLink: string;


    @ApiProperty({
      description: 'The list of the tags.',
    })
    public tagList?: string[];
  }

   export class CreateLinkPostDto {
    @ApiProperty({
      description: 'The link.',
      required: true,
    })
    public linkUPL: string;

    @ApiProperty({
      description: 'The description.',
      required: true,
    })
    public linkDescription: string;

    @ApiProperty({
      description: 'The list of the tags.',
    })
    public tagList?: string[];
  }





