import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { inbox } from "./inbox.schema";

export type UserDocument = user & Document

@Schema()
export class user {
    @Prop()
    Name : string

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "Inbox"})
    Inboxes : inbox[]
}

export const UserScehma = SchemaFactory.createForClass(user);