import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from 'src/todo/interface/status.enum';
import { Priority } from 'src/todo/interface/priority.enum';

export type TodoDocument = Todo & Document

const defaultDate = new Date()

@Schema()
export class Todo {

  @Prop({ required: true })
  title: string

  @Prop({ default: "" })
  description: string

  @Prop({ enum: Status })
  status: string

  @Prop()
  dueDate: Date

  @Prop({ enum: Priority })
  priority: string

}

export const TodoSchema = SchemaFactory.createForClass(Todo)