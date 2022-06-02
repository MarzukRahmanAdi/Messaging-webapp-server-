import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user, UserDocument } from './schemas/User.schema';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { message , MessageDocument } from './schemas/message.schema';
import { inbox, InboxDocument } from './schemas/inbox.schema';
import { CreateMessageDto } from './dto/message.dto';



@Injectable()
export class UserService {

  constructor(@InjectModel(user.name) private userModel : Model<UserDocument>, @InjectModel(inbox.name) private InboxModel : Model<InboxDocument>,  @InjectModel(message.name) private MessageModel : Model<MessageDocument>){}

  async create(createUserDto: CreateUserDto) {
      if(createUserDto.Password && createUserDto.Email && createUserDto.Name){
        const user:any = await this.userModel.findOne({"Email" : createUserDto.Email}).exec();  
        if(!user){
          const hash = await bcrypt.hash(createUserDto.Password, 10);
          createUserDto.Password = hash;
            
          const customUser = new this.userModel(createUserDto);
          customUser.save();
          return {Response : {
            Name : customUser.Name,
            Id : customUser._id,
            Email: customUser.Email
          }}
        } else{
          throw new HttpException('Email already used', HttpStatus.FORBIDDEN);
        }


      } else{
        return false;
      }

  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }


  
  async login(createUserDto: CreateUserDto){
    console.log(createUserDto)
    if(createUserDto.Password && createUserDto.Email){
      const user:any = await this.userModel.findOne({"Email" : createUserDto.Email}).exec();  
      
      if(!user) {
        throw new HttpException('Email not found', HttpStatus.FORBIDDEN);
      }
    try{
      const isMatch = await bcrypt.compare(createUserDto.Password, user.Password);
      if(isMatch) {
        return {response : {id: user._id, name : user.Name, email: user.Email}}
      }
      else throw new HttpException('Wrong Password', HttpStatus.FORBIDDEN);
      
    } catch(err){
      return err
    }
  } else{
    return false
  }
  }
  
  async GetMessages(Sender: string, Receiver: string){
      const message = await this.InboxModel.find({Sender : Sender, Receiver : Receiver}).populate("messages")
      if(message){
        //Get all messages
        return message
      } else{
        //Create new inbox
        const customInbox = new this.InboxModel({Sender : Sender, Receiver : Receiver})
        return customInbox.save()
      }
  }
  
  async SaveMessage(createMessageDto : CreateMessageDto){
    const messageBox = await this.MessageModel.findById(createMessageDto.chatId);

  }
}
