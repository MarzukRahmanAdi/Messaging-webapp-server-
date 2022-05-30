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

    


    @Prop({type : mongoose.Schema.Types.ObjectId, ref: "Inbox"})
    Inbox : inbox[]
}

export const MessageSchema = SchemaFactory.createForClass(message)