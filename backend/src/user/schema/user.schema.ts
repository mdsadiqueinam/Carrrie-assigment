import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Todo, TodoDocument, TodoSchema } from 'src/todo/schema/todo.schema';

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {

  @Prop({ unique: true, required: true })
  username: string

  @Prop({ unique: true, required: true })
  email: string

  @Prop()
  hash: string

  @Prop()
  salt: string

  @Prop()
  name: string;

  @Prop({ type: [TodoSchema], default: [] })
  todos: Types.DocumentArray<TodoDocument>
}

export const UserSchema = SchemaFactory.createForClass(User);