import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMessageDto } from './dto/message.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


  @Get('/:Sender/message/:Receiver')
  getMessage(@Param('Sender') Sender:string, @Param('Receiver') Receiver:string){
      return this.userService.GetMessages(Sender, Receiver);
  }

  @Post('PushMessage')
  SaveMessage(@Body() createMessageDto: CreateMessageDto){
      return this.userService.SaveMessage(createMessageDto);
  }


  @Post('login')
  login(@Body() createUserDto:CreateUserDto ){
     return this.userService.login(createUserDto);
  }
}
