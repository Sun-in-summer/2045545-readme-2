import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig  from '../config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
    }),
    BlogUserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
