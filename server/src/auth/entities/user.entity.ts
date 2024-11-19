import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'The name of the user.',
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @Column('text', { nullable: true })
  last_name: string;

  @ApiProperty({
    example: 'john@test.com',
    description: 'The email of the user.',
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user.',
  })
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    example: ['user'],
    description: 'The roles of the user.',
    default: ['user'],
  })
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('bool', { default: true })
  active: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
