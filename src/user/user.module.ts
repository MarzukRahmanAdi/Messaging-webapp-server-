import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserScehma } from './schemas/User.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : user.name, schema: UserScehma}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
