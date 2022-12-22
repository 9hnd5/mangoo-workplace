import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDB1671643923058 implements MigrationInterface {
    name = 'updateDB1671643923058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workplace-member\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` ADD PRIMARY KEY (\`workplaceId\`)`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` DROP COLUMN \`memberId\``);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` ADD \`memberId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` ADD PRIMARY KEY (\`workplaceId\`, \`memberId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workplace-member\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` ADD PRIMARY KEY (\`workplaceId\`)`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` DROP COLUMN \`memberId\``);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` ADD \`memberId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`workplace-member\` ADD PRIMARY KEY (\`workplaceId\`, \`memberId\`)`);
    }

}
