import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from 'src/todo/schema/todo.schema';

@ApiBearerAuth()
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 
   * Title is required for creating new Todo
   */
  @ApiCreatedResponse({
    type: Todo
  })
  @Post('create')
  async create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return await this.todoService.create(createTodoDto, req.user);
  }

  /**
   * Provides the list of Todo
   */
  @ApiCreatedResponse({
    type: [Todo]
  })
  @Get('view')
  async findAll(@Request() req) {
    return await this.todoService.findAll(req.user);
  }

  @ApiResponse({
    type: Todo,
    status: 200
  })
  @Get('view/:id')
  async findById(@Param('id') id: string, @Request() req) {
    return await this.todoService.findById(id, req.user);
  }

  /**
   * Todo Id is required to update todo
   */
  @ApiResponse({
    type: Todo,
    status: 200
  })
  @Patch('update')
  async update(@Body() updateTodoDto: UpdateTodoDto, @Request() req) {
    return await this.todoService.update(updateTodoDto, req.user);
  }

  /**
   * Todo Id is passed as path params to delete existing Todo
   */
  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Request() req) {
    return await this.todoService.remove(id, req.user);
  }
}
