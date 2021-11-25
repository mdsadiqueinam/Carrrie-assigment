import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

  constructor(private readonly userService: UserService) {}

  private async findUser(id: string): Promise<UserDocument> {
    const user = await this.userService.findById(id);
    if(!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  private async findTodo(id: string, user: UserDocument) {
    const todo = user.todos.id(id);
    if(!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto, payload: any) {
    const user = await this.findUser(payload.userId);
    user.todos.push(createTodoDto);
    await user.save(); 
    return user.todos[user.todos.length - 1];
  }

  async findAll(payload: any) {
    const user = await this.findUser(payload.userId);
    return user.todos;
  }

  async findById(id: string, payload: any) {
    const user = await this.findUser(payload.userId);
    return await this.findTodo(id, user);
  }

  async update(updateTodoDto: UpdateTodoDto, payload: any) {
    const user = await this.findUser(payload.userId);
    const todo = await this.findTodo(updateTodoDto.id, user);
    todo.set(updateTodoDto);
    await user.save();
    return todo;
  }

  async remove(id: string, payload: any) {
    const user = await this.findUser(payload.userId);
    const todo = await this.findTodo(id, user);
    const title = todo.title;
    todo.remove();
    await user.save();
    return `Deleted ${title}`;
  }
}
