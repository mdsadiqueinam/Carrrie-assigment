import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document

@Schema()
export class Todo {

  @Prop({ required: true })
  title: string

  @Prop({ default: "" })
  description: string

  @Prop({ default: false })
  isCompleted: boolean

  @Prop()
  dueDate: Date

}

export const TodoSchema = SchemaFactory.createForClass(Todo)