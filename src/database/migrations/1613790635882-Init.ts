import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1613790635882 implements MigrationInterface {
	name = "Init1613790635882";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "app"."user" ("id" uuid NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "name" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "app"."user"`);
	}
}
