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

    
    private _value : string;
    public get value() : string {
        return this._value;
    }
    public set value(v : string) {
        this._value = v;
    }
    

    @Prop({type : mongoose.Schema.Types.ObjectId, ref: "Inbox"})
    Inbox : inbox[]
}

export const MessageSchema = SchemaFactory.createForClass(message)