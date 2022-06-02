import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { inbox } from "./inbox.schema";

export type MessageDocument = message & Document


@Schema()
export class message{

    @Prop()
    Sender : boolean

    @Prop()
    Receiver : boolean

    @Prop()
    Text : string

}

export const MessageSchema = SchemaFactory.createForClass(message)