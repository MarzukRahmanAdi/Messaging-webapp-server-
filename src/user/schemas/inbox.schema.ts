import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { user } from "./User.schema";

export type InboxDocument = inbox & Document


@Schema()
export class inbox{
    @Prop({type : mongoose.Schema.Types.ObjectId, ref : "User"})
    Sender : user

    @Prop({type : mongoose.Schema.Types.ObjectId, ref : "User"})
    Receiver : user

    @Prop({type : mongoose.Schema.Types.ObjectId, ref : "message"})
    messages : message[]
}