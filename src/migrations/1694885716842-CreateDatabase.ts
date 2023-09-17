import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1694885716842 implements MigrationInterface {
    name = 'CreateDatabase1694885716842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friendships" ("id_friendship" uuid NOT NULL, "sender_id" uuid NOT NULL, "receiver_id" uuid NOT NULL, "reviwed_by_receiver" boolean NOT NULL DEFAULT false, "accepted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8e6a67aaca37c514f4d5eb6d031" PRIMARY KEY ("id_friendship"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id_notification" uuid NOT NULL, "message" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL, "user_id" uuid NOT NULL, "sent_by" uuid NOT NULL, "friendship_id" uuid, "participation_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_aeb74360cf6bc2b15d19ff1c15e" PRIMARY KEY ("id_notification"))`);
        await queryRunner.query(`CREATE TABLE "participations" ("id_participation" uuid NOT NULL, "type" character varying NOT NULL, "in" boolean NOT NULL DEFAULT false, "confirmed_by_user" boolean NOT NULL DEFAULT false, "confirmed_by_event" boolean NOT NULL DEFAULT false, "reviwed_by_user" boolean NOT NULL DEFAULT false, "reviwed_by_event" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, "reviwer_id" uuid, "event_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9a903774221e8c192b899560423" PRIMARY KEY ("id_participation"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "bio" character varying, "location" character varying, "age" integer, "gender" character varying, "picture" character varying, "cover_photo" character varying, "private" boolean NOT NULL DEFAULT false, "locale" character varying, "CNPJ" character varying, "role_name" character varying NOT NULL DEFAULT 'user', "google_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id_event" uuid NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "date" date NOT NULL, "time" TIME NOT NULL, "finish_date" date NOT NULL, "finish_time" TIME NOT NULL, "actived" boolean NOT NULL DEFAULT true, "additional" character varying, "club_name" character varying, "performer" character varying, "drink_preferences" character varying, "img_url" character varying, "age_limit" integer NOT NULL DEFAULT '0', "free_ticket" integer NOT NULL DEFAULT '0', "private" boolean NOT NULL DEFAULT false, "owner_id" uuid NOT NULL, "address_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_72a0a3c62df3f106392cdfd510d" PRIMARY KEY ("id_event"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id_address" uuid NOT NULL, "lat" numeric(10,6) NOT NULL, "long" numeric(10,6) NOT NULL, "zip" character varying, "street" character varying, "uf" character varying, "city" character varying, "district" character varying, "number" character varying, "user_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5cc63ead447e5007e73ee0ceadb" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_c3fa0f348b7d7cd94e9938a7364" FOREIGN KEY ("sender_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_e6f5aea2073c03cb60231b0b4e8" FOREIGN KEY ("receiver_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_7a3d995cd7cda88d790e8d161da" FOREIGN KEY ("sent_by") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_ced5a2135031aaf0300206cd93b" FOREIGN KEY ("friendship_id") REFERENCES "friendships"("id_friendship") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_ba4018856eb613bc876bbf5f6e6" FOREIGN KEY ("participation_id") REFERENCES "participations"("id_participation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_caa161d96eaa904c6bc3c83f2bd" FOREIGN KEY ("reviwer_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_beb91b101db32ac72ac8ae3fefe" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_918130b4f882fda431503d6f4e0" FOREIGN KEY ("owner_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d" FOREIGN KEY ("address_id") REFERENCES "addresses"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_918130b4f882fda431503d6f4e0"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_beb91b101db32ac72ac8ae3fefe"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_caa161d96eaa904c6bc3c83f2bd"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_ba4018856eb613bc876bbf5f6e6"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_ced5a2135031aaf0300206cd93b"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_7a3d995cd7cda88d790e8d161da"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_e6f5aea2073c03cb60231b0b4e8"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_c3fa0f348b7d7cd94e9938a7364"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "participations"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "friendships"`);
    }

}
