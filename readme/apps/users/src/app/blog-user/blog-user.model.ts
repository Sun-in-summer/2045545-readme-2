import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@readme/shared-types';
import  {Document} from 'mongoose';



@Schema({
  collection: 'users',
})
export class BlogUserModel extends Document implements User {
   @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  firstname: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  birthDate: Date;

  @Prop()
  avatar: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole

  @Prop({
    required: true,
  })
  passwordHash: string;




}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

