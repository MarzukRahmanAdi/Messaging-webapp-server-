import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user, UserDocument } from './schemas/User.schema';


type User = {
  [key : string] : any
}

@Injectable()
export class UserService {

  constructor(@InjectModel(user.name) private userModel : Model<UserDocument>){}

  async create(createUserDto: CreateUserDto):Promise<user> {
      let newUser:User = {Name : "", Password: ""}

      const newUser["Name"] = CreateUserDto.name
      
      const customUser = new this.userModel(newUser);
      return customUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }


  GetMessages(userId: number){
      
  }
}
