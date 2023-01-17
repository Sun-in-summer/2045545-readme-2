import {User, UserRole} from '@readme/shared-types';
import {genSalt, compare, hash} from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';



export class BlogUserEntity implements User {
  public _id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public birthDate: Date;
  public avatar: string;
  public role: UserRole;
  public passwordHash: string;
  public isSubscribed: boolean;

  constructor (blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string) : Promise <BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt)
    return this;
  }

  public async comparePassword( password: string) : Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(blogUser: User) {
    this._id =blogUser._id;
    this.avatar = blogUser.avatar;
    this.birthDate =blogUser.birthDate;
    this.email =blogUser.email;
    this.firstname=blogUser.firstname;
    this.lastname = blogUser.lastname;
    this.passwordHash = blogUser.passwordHash;
    this.role = blogUser.role;
    this.isSubscribed = blogUser.isSubscribed;
  }
}
