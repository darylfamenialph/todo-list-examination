import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

export type ToDoDocument = ToDo & Document;
@Schema({ timestamps: true })
export class ToDo {

    _id: ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    createdBy: ObjectId;

}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);