import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enums/enums';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({
    example: '2af83e3e-b0b0-4b7d-90f9-f067be7cef1d',
    description: 'The id of the task.',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Task title',
    description: 'The title of the task.',
  })
  @Column('text')
  title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task.',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'OPEN',
    description: 'The status of the task.',
    enum: TaskStatus,
    default: TaskStatus.IN_PROGRESS,
  })
  @Column('enum', { enum: TaskStatus, default: 'OPEN' })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
