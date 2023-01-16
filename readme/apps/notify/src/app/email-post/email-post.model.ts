import  {Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailPost } from '@readme/shared-types';


const POSTS_COLLECTION_NAME = 'email-posts'

@Schema({
  collection: POSTS_COLLECTION_NAME,
})
export class EmailPostModel extends Document implements EmailPost {
   @Prop({
    required: true,
    unique: true,
  })
  email: string;


  @Prop({
    type: String,
  })
  postId: string

}

export const EmailPostSchema = SchemaFactory.createForClass(EmailPostModel);

