import { Test, TestingModule } from '@nestjs/testing';
import { TasksModule } from './tasks.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/enums';
import * as request from 'supertest';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

describe('TasksController', () => {
  let dataSource: DataSource;
  let app: INestApplication;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'password',
          database: 'test_database',
          entities: [Task],
          synchronize: true,
          autoLoadEntities: true,
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'secret-db',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));

    dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'test_database',
      entities: [Task],
      synchronize: true,
    });
    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.getRepository(Task).clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('POST - create task', () => {
    it('Unauthenticated users cannot create tasks', async () => {
      const task = {
        title: 'Test task',
        description: 'Test description',
        status: TaskStatus.OPEN,
      };

      await request(app.getHttpServer())
        .post('/tasks')
        .send(task)
        .set('Accept', 'application/json')
        .expect(401);

      const tasks = await repository.find({ take: 10 });
      expect(tasks.length).toBe(0);
    });
  });

  /*
  it('[PUT] - should update a task', async () => {
    const task = {
      title: 'Test task',
      status: TaskStatus.OPEN,
    };

    const taskCreated = await repository.save(task);
    await request(app.getHttpServer())
      .patch(`/tasks/${taskCreated.id}`)
      .send({ title: 'updated task' })
      .expect(200);

    const updatedTask = await repository.findOneBy({ id: taskCreated.id });

    expect(updatedTask.title).toBe('updated task');
  });

  it('[DELETE] - should delete a task', async () => {
    const task = {
      title: 'Test task',
      status: TaskStatus.OPEN,
    };

    const taskCreated = await repository.save(task);
    await request(app.getHttpServer())
      .delete(`/tasks/${taskCreated.id}`)
      .expect(200);

    const tasks = await repository.find({ take: 10 });
    expect(tasks.length).toBe(0);
  });

  it('[GET] - should find all tasks', async () => {
    const task = {
      title: 'Test task',
      status: TaskStatus.OPEN,
    };
    const task2 = {
      title: 'Test task 2',
      status: TaskStatus.OPEN,
    };
    await repository.save(task);
    await repository.save(task2);

    await request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
      });
  }); */
});
