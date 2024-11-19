import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/interfaces/roles.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('Tasks')
@Controller('tasks')
@Auth(Roles.User)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: 201,
    description: 'Created successfully.',
    type: Task,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @ApiResponse({
    status: 200,
    description: 'Success.',
    type: [Task],
  })
  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @ApiResponse({
    status: 200,
    description: 'Success.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiResponse({ status: 204, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiResponse({ status: 204, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
