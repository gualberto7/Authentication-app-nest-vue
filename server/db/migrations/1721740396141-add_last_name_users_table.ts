import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameUsersTable1721740396141 implements MigrationInterface {
    name = 'AddLastNameUsersTable1721740396141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
    }

}
