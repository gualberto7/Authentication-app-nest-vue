import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto, user: User) {
    try {
      const task = this.taskRepository.create({ ...createTaskDto, user });
      return this.taskRepository.save(task);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(user: User) {
    return this.taskRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      return this.taskRepository.update(id, updateTaskDto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: string) {
    try {
      return this.taskRepository.delete(id);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
