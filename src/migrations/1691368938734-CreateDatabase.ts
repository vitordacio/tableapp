import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1691368938734 implements MigrationInterface {
    name = 'CreateDatabase1691368938734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "participation_types" ("id_participation_type" uuid NOT NULL, "type" character varying NOT NULL, "type_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_77b6dfa37b6acbc91a98332ccb9" PRIMARY KEY ("id_participation_type"))`);
        await queryRunner.query(`CREATE TABLE "participations" ("id_participation" uuid NOT NULL, "going" boolean NOT NULL DEFAULT false, "description" character varying, "meeting_id" uuid NOT NULL, "user_id" uuid NOT NULL, "type_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9a903774221e8c192b899560423" PRIMARY KEY ("id_participation"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "phone" character varying, "avatar" character varying, "role_name" character varying NOT NULL DEFAULT 'user', "address_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "meeting_types" ("id_meeting_type" uuid NOT NULL, "type" character varying NOT NULL, "type_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d770d2b0512ad1ddd596f306f7b" PRIMARY KEY ("id_meeting_type"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id_meeting" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "location" character varying NOT NULL, "owner_id" uuid NOT NULL, "type_id" uuid NOT NULL, "address_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_12453285f1a5456d61ebf1cfc6" UNIQUE ("owner_id"), CONSTRAINT "REL_c7601b4aa4f38e49e75c0b4f9d" UNIQUE ("address_id"), CONSTRAINT "PK_1a3147ec7d83985dcce7b882ccc" PRIMARY KEY ("id_meeting"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id_address" uuid NOT NULL, "description" character varying NOT NULL, "zip" character varying, "street" character varying, "uf" character varying, "city" character varying, "district" character varying, "number" character varying, "lat" numeric(10,6), "long" numeric(10,6), "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5cc63ead447e5007e73ee0ceadb" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_0b7087a47e31a56cd429a33665c" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id_meeting") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_060c14590bf05f85bad65273f86" FOREIGN KEY ("type_id") REFERENCES "participation_types"("id_participation_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_12453285f1a5456d61ebf1cfc63" FOREIGN KEY ("owner_id") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_3a32047f031e7a4d056a2df5ece" FOREIGN KEY ("type_id") REFERENCES "meeting_types"("id_meeting_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_c7601b4aa4f38e49e75c0b4f9d5" FOREIGN KEY ("address_id") REFERENCES "addresses"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_c7601b4aa4f38e49e75c0b4f9d5"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_3a32047f031e7a4d056a2df5ece"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_12453285f1a5456d61ebf1cfc63"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_060c14590bf05f85bad65273f86"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_0b7087a47e31a56cd429a33665c"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "meeting_types"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "participations"`);
        await queryRunner.query(`DROP TABLE "participation_types"`);
    }

}
