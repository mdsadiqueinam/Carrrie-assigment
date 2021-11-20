import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return await this.todoService.create(createTodoDto, req.user);
  }

  @Get('view')
  async findAll(@Request() req) {
    return await this.todoService.findAll(req.user);
  }

  @Get('view/:id')
  async findById(@Param('id') id: string, @Request() req) {
    return await this.todoService.findById(id, req.user);
  }

  @Patch('update')
  async update(@Body() updateTodoDto: UpdateTodoDto, @Request() req) {
    return await this.todoService.update(updateTodoDto, req.user);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Request() req) {
    return await this.todoService.remove(id, req.user);
  }
}
