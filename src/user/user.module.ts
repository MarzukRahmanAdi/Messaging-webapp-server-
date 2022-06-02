import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserScehma } from './schemas/User.schema';
import { inbox, InboxSchema } from './schemas/inbox.schema';
import { message, MessageSchema } from './schemas/message.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : user.name, schema: UserScehma}, {name: inbox.name, schema : InboxSchema}, {name: message.name, schema : MessageSchema} ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
