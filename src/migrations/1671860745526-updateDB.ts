import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDB1671860745526 implements MigrationInterface {
    name = 'updateDB1671860745526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`updateDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`updateDate\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`createdDate\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`createdBy\``);
    }

}
