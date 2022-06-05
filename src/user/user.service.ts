import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
          //if there is no user using that email
          const hash = await bcrypt.hash(createUserDto.Password, 10);
          createUserDto.Password = hash;
            
          const customUser = new this.userModel(createUserDto);
          customUser.save();
          return {Response : {
            name : customUser.Name,
            id : customUser._id,
            email: customUser.Email
          }}
        } else{
          throw new HttpException('Email already used', HttpStatus.FORBIDDEN);
        }


      } else{
        return false;
      }

  }

  async findAll() {
    let names = new Array()
    const users:any = await this.userModel.find().exec();

    users.map(x =>{      
      names.push({name : x.Name, id : x._id})
    })
    
    return names
  }

  findOne(id: string) {
    const user:any = this.userModel.findById(id).exec()
    return user.Name
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
    console.log(Sender, Receiver);
    let message2:any;
      const message = await this.InboxModel.find({Sender : Sender, Receiver : Receiver}).populate("messages")
      console.log(message.length)
      if(message.length !== 0){
        return message
      }
      if(message.length === 0 || message === null){
        //Get all messages
        message2 = await this.InboxModel.find({Sender : Receiver, Receiver : Sender}).populate("messages")
        console.log("case 1", message)
        console.log("case 2", message2)
      }
      if( message2.length !== 0 ){
        return message2
      } else{
        //Create new inbox
        const customInbox = new this.InboxModel({Sender : Sender, Receiver : Receiver})
        console.log("case 2", customInbox)
        return customInbox.save()
      }
  }
  
  async SaveMessage(createMessageDto : CreateMessageDto){
    try{
      console.log(createMessageDto)
      const message = {Sender : createMessageDto.Sender, Receiver : createMessageDto.Receiver, Text: createMessageDto.Text}
      const CustomMessage = await new this.MessageModel(message)
      console.log(CustomMessage);
      
      const messageBox:any = await this.InboxModel.findOneAndUpdate({ _id : createMessageDto.chatId}, {$push : {messages : [CustomMessage._id] }});
      console.log(messageBox)
      if(messageBox.messages.length !== 0){
        console.log("saving");
        
        CustomMessage.save()
        return messageBox.save();
      }
    } catch(err) {
      return err
    }
  }
}