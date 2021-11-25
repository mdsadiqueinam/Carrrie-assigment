import { IsNotEmpty, IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Status } from 'src/todo/interface/status.enum';
import { Priority } from 'src/todo/interface/priority.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsEnum(Status, {
    message: `Status must be valid enum value within [${Object.keys(Status)}]`
  })
  status: Status;

  @IsEnum(Priority, {
    message: `Priority must be valid enum value within [${Object.keys(Priority)}]`
  })
  priority: Priority;

  @IsDateString({}, {
    message: "Due Date is required"
  })
  dueDate: Date;

}
