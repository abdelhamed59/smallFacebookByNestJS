import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    CommentsModule,
    MongooseModule.forRoot('mongodb://localhost/firstNestApp'),
    MailerModule.forRoot({
      transport:{
        service:"gmail",
        auth: {
          user: "abdelhamedelkholy59@gmail.com",
          pass: "erjb oisb fzum kgpk",
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
