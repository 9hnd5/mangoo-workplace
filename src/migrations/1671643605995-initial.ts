import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1671643605995 implements MigrationInterface {
    name = 'initial1671643605995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`section\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workplace-member\` (\`workplaceId\` int NOT NULL, \`memberId\` int NOT NULL, PRIMARY KEY (\`workplaceId\`, \`memberId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workplace\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdBy\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(1000) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`workplaceId\` int NOT NULL, \`description\` varchar(1000) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`workplace\``);
        await queryRunner.query(`DROP TABLE \`workplace-member\``);
        await queryRunner.query(`DROP TABLE \`section\``);
    }

}
