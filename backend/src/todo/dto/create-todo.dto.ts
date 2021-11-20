import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

}
