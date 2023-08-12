import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1691883195929 implements MigrationInterface {
    name = 'CreateDatabase1691883195929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "participation_types" ("id_participation_type" uuid NOT NULL, "type" character varying NOT NULL, "type_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_77b6dfa37b6acbc91a98332ccb9" PRIMARY KEY ("id_participation_type"))`);
        await queryRunner.query(`CREATE TABLE "participations" ("id_participation" uuid NOT NULL, "confirmed" boolean NOT NULL DEFAULT true, "user_id" uuid NOT NULL, "event_id" uuid NOT NULL, "allowed_by" uuid NOT NULL, "type_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9a903774221e8c192b899560423" PRIMARY KEY ("id_participation"))`);
        await queryRunner.query(`CREATE TABLE "follows" ("id_address" uuid NOT NULL, "follower_id" uuid NOT NULL, "followed_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_197f3280f2e008217c91b15462b" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "avatar" character varying NOT NULL, "role_name" character varying NOT NULL DEFAULT 'user', "address_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "event_types" ("id_event_type" uuid NOT NULL, "type" character varying NOT NULL, "type_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9968858d6c77a00288833c7d343" PRIMARY KEY ("id_event_type"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id_event" uuid NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "time" TIMESTAMP NOT NULL, "additional" character varying NOT NULL, "club_name" character varying NOT NULL, "performer" character varying NOT NULL, "drink_preferences" character varying NOT NULL, "age_limit" integer NOT NULL, "free_ticket" integer NOT NULL DEFAULT '0', "private" boolean NOT NULL DEFAULT false, "owner_id" uuid NOT NULL, "type_id" uuid NOT NULL, "address_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_72a0a3c62df3f106392cdfd510d" PRIMARY KEY ("id_event"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id_address" uuid NOT NULL, "name" character varying NOT NULL, "zip" character varying NOT NULL, "street" character varying NOT NULL, "uf" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "number" character varying NOT NULL, "lat" numeric(10,6) NOT NULL, "long" numeric(10,6) NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5cc63ead447e5007e73ee0ceadb" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_beb91b101db32ac72ac8ae3fefe" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_48bda431dcefe20e9b5ea0e2ebf" FOREIGN KEY ("allowed_by") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_060c14590bf05f85bad65273f86" FOREIGN KEY ("type_id") REFERENCES "participation_types"("id_participation_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_48e534a8c1b29ca3a81e8d112b7" FOREIGN KEY ("followed_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_918130b4f882fda431503d6f4e0" FOREIGN KEY ("owner_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_bcb2ce0072504d624725e3ef826" FOREIGN KEY ("type_id") REFERENCES "event_types"("id_event_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d" FOREIGN KEY ("address_id") REFERENCES "addresses"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_bcb2ce0072504d624725e3ef826"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_918130b4f882fda431503d6f4e0"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_48e534a8c1b29ca3a81e8d112b7"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_060c14590bf05f85bad65273f86"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_48bda431dcefe20e9b5ea0e2ebf"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_beb91b101db32ac72ac8ae3fefe"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "event_types"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "follows"`);
        await queryRunner.query(`DROP TABLE "participations"`);
        await queryRunner.query(`DROP TABLE "participation_types"`);
    }

}
