import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type UserDocument = User & Document;

export class User {
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
