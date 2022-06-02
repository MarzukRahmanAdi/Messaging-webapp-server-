import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import 'dotenv/config'

@Module({
  // imports: [UserModule, MongooseModule.forRoot(process.env.MONGOPASS)],
  imports: [UserModule, MongooseModule.forRoot("mongodb://localhost:27017/nest")],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
