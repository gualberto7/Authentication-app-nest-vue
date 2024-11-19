import { registerAs } from '@nestjs/config';

export default registerAs('test_db', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'test_database',
  synchronize: true,
  autoLoadEntities: true,
}));
