import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../enums/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Task title',
    description: 'The title of the task.',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'OPEN',
    description: 'The status of the task.',
    enum: TaskStatus,
    default: TaskStatus.IN_PROGRESS,
  })
  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status: TaskStatus;
}
