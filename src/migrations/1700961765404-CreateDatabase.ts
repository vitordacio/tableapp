import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1700961765404 implements MigrationInterface {
    name = 'CreateDatabase1700961765404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id_address" uuid NOT NULL, "lat" numeric(10,6) NOT NULL, "long" numeric(10,6) NOT NULL, "zip" character varying, "street" character varying, "uf" character varying, "city" character varying, "district" character varying, "number" character varying, "user_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5cc63ead447e5007e73ee0ceadb" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`CREATE TABLE "friendships" ("id_friendship" uuid NOT NULL, "author_id" uuid NOT NULL, "receiver_id" uuid NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8e6a67aaca37c514f4d5eb6d031" PRIMARY KEY ("id_friendship"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id_notification" uuid NOT NULL, "message" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL, "user_id" uuid NOT NULL, "author_id" uuid NOT NULL, "friendship_id" uuid, "emoji_id" uuid, "participation_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_aeb74360cf6bc2b15d19ff1c15e" PRIMARY KEY ("id_notification"))`);
        await queryRunner.query(`CREATE TABLE "emoji_types" ("id_emoji_type" uuid NOT NULL, "emoji" character varying NOT NULL, "name" character varying NOT NULL, "shorthand" character varying NOT NULL, "category" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_21ef76d67a4942cb1d4c2f86adf" UNIQUE ("emoji"), CONSTRAINT "UQ_abc887fad2dc8694412583da5dc" UNIQUE ("name"), CONSTRAINT "PK_7b715fc1885b7f34fce7f8413e4" PRIMARY KEY ("id_emoji_type"))`);
        await queryRunner.query(`CREATE TABLE "emojis" ("id_emoji" uuid NOT NULL, "type_id" uuid NOT NULL, "author_id" uuid NOT NULL, "receiver_id" uuid, "event_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6215c64920c13bccc7a4d966382" PRIMARY KEY ("id_emoji"))`);
        await queryRunner.query(`CREATE TABLE "reports" ("id_report" uuid NOT NULL, "message" character varying NOT NULL, "author_id" uuid NOT NULL, "receiver_id" uuid, "event_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0bf1632425b0d79f9fa72f24760" PRIMARY KEY ("id_report"))`);
        await queryRunner.query(`CREATE TABLE "event_types" ("id_event_type" uuid NOT NULL, "name" character varying NOT NULL, "free_access" boolean NOT NULL DEFAULT true, "count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_d5110ab69f4aacfe41fecdf4fcd" UNIQUE ("name"), CONSTRAINT "PK_9968858d6c77a00288833c7d343" PRIMARY KEY ("id_event_type"))`);
        await queryRunner.query(`CREATE TABLE "event_pictures" ("id_event_picture" uuid NOT NULL, "url" character varying NOT NULL, "title" character varying, "description" character varying, "event_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_1872c4eee11fbb656e25623f05f" PRIMARY KEY ("id_event_picture"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id_event" uuid NOT NULL, "type_id" uuid NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "date" date NOT NULL, "time" TIME NOT NULL, "finish_date" date NOT NULL, "finish_time" TIME NOT NULL, "participating_count" integer NOT NULL DEFAULT '1', "emojis_count" integer NOT NULL DEFAULT '0', "additional" character varying, "drink_preferences" character varying, "min_amount" integer, "tickets_free" integer NOT NULL DEFAULT '0', "ticket_value" integer NOT NULL DEFAULT '0', "club_name" character varying, "performer" character varying, "cover_photo" character varying, "private" boolean NOT NULL DEFAULT false, "tags" character varying array NOT NULL, "author_id" uuid NOT NULL, "address_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_72a0a3c62df3f106392cdfd510d" PRIMARY KEY ("id_event"))`);
        await queryRunner.query(`CREATE TABLE "participations" ("id_participation" uuid NOT NULL, "type" character varying NOT NULL, "in" boolean NOT NULL DEFAULT false, "confirmed_by_user" boolean NOT NULL DEFAULT false, "confirmed_by_event" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, "reviwer_id" uuid, "event_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9a903774221e8c192b899560423" PRIMARY KEY ("id_participation"))`);
        await queryRunner.query(`CREATE TABLE "social_network_types" ("id_social_network_type" uuid NOT NULL, "name" character varying NOT NULL, "base_url" character varying NOT NULL, "deep_link" character varying, "count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_80e0e9ba31449b7b7a24185cc58" UNIQUE ("name"), CONSTRAINT "PK_dcaeea2a15b0c4a9503856f62a5" PRIMARY KEY ("id_social_network_type"))`);
        await queryRunner.query(`CREATE TABLE "social_networks" ("id_social_network" uuid NOT NULL, "username" character varying NOT NULL, "type_id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f5a64d121d98444a11c72e767cf" PRIMARY KEY ("id_social_network"))`);
        await queryRunner.query(`CREATE TABLE "blocks" ("id_block" uuid NOT NULL, "author_id" uuid NOT NULL, "receiver_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f7e9e0782b017ef4c7abdb7b391" PRIMARY KEY ("id_block"))`);
        await queryRunner.query(`CREATE TABLE "suggestions" ("id_suggestion" uuid NOT NULL, "message" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e2d7983a8f1e14b4dc8adf1f11a" PRIMARY KEY ("id_suggestion"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "bio" character varying, "location" character varying, "gender" character varying, "picture" character varying, "cover_photo" character varying, "actived" boolean NOT NULL DEFAULT true, "private" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "locale" character varying, "CNPJ" character varying, "role_name" character varying NOT NULL DEFAULT 'user', "google_id" character varying, "tags" character varying array NOT NULL, "friends_count" integer NOT NULL DEFAULT '0', "emojis_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "achievement_types" ("id_achievement_type" uuid NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "difficulty" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ca973f46e508d79646e559f1cfa" UNIQUE ("name"), CONSTRAINT "PK_625459a3bff46d931978bcaa76a" PRIMARY KEY ("id_achievement_type"))`);
        await queryRunner.query(`CREATE TABLE "achievements" ("id_achievement" uuid NOT NULL, "type_id" uuid NOT NULL, "user_id" uuid, "event_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_fd05bb673fad4f5a7e99da97e3a" PRIMARY KEY ("id_achievement"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_2838df119e620b5c762aca5f5a9" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendships" ADD CONSTRAINT "FK_e6f5aea2073c03cb60231b0b4e8" FOREIGN KEY ("receiver_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_cca22a79492216c7c08f8773d8d" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_ced5a2135031aaf0300206cd93b" FOREIGN KEY ("friendship_id") REFERENCES "friendships"("id_friendship") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_abaf9606bfc0ed79d603c3f0683" FOREIGN KEY ("emoji_id") REFERENCES "emojis"("id_emoji") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_ba4018856eb613bc876bbf5f6e6" FOREIGN KEY ("participation_id") REFERENCES "participations"("id_participation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emojis" ADD CONSTRAINT "FK_454c6e2124e1034893c9822336f" FOREIGN KEY ("type_id") REFERENCES "emoji_types"("id_emoji_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emojis" ADD CONSTRAINT "FK_683569193071276245fcf3ca4d1" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emojis" ADD CONSTRAINT "FK_d89344bcb6fc6eca6dd406e3dd9" FOREIGN KEY ("receiver_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emojis" ADD CONSTRAINT "FK_e627291c8f9ba13130231cf2f34" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_af66c04d96c3fd3ba7612fdf5e9" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_5d45095abb492e416c4cca90b84" FOREIGN KEY ("receiver_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_d5643c2d498bd247a29670cc519" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_pictures" ADD CONSTRAINT "FK_9c0f6b0596a661929a184d87522" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_bcb2ce0072504d624725e3ef826" FOREIGN KEY ("type_id") REFERENCES "event_types"("id_event_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_389b662d0b626b48a1ce4e2c8f8" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d" FOREIGN KEY ("address_id") REFERENCES "addresses"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_caa161d96eaa904c6bc3c83f2bd" FOREIGN KEY ("reviwer_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participations" ADD CONSTRAINT "FK_beb91b101db32ac72ac8ae3fefe" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "social_networks" ADD CONSTRAINT "FK_8a7ee903801b9b168b766d5490b" FOREIGN KEY ("type_id") REFERENCES "social_network_types"("id_social_network_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "social_networks" ADD CONSTRAINT "FK_a8330c2c4cfd08c00e7f64f19a2" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocks" ADD CONSTRAINT "FK_d1ac99d8067bf6fcf5962b1af38" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocks" ADD CONSTRAINT "FK_72978a1c7ea174e27bdc8960937" FOREIGN KEY ("receiver_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suggestions" ADD CONSTRAINT "FK_d5f8b29a35d481f2c4200dae9e8" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "achievements" ADD CONSTRAINT "FK_2888c1257c41913030b59369f96" FOREIGN KEY ("type_id") REFERENCES "achievement_types"("id_achievement_type") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "achievements" ADD CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "achievements" ADD CONSTRAINT "FK_439fe2afbe76423baefd988dbd8" FOREIGN KEY ("event_id") REFERENCES "events"("id_event") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "achievements" DROP CONSTRAINT "FK_439fe2afbe76423baefd988dbd8"`);
        await queryRunner.query(`ALTER TABLE "achievements" DROP CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434"`);
        await queryRunner.query(`ALTER TABLE "achievements" DROP CONSTRAINT "FK_2888c1257c41913030b59369f96"`);
        await queryRunner.query(`ALTER TABLE "suggestions" DROP CONSTRAINT "FK_d5f8b29a35d481f2c4200dae9e8"`);
        await queryRunner.query(`ALTER TABLE "blocks" DROP CONSTRAINT "FK_72978a1c7ea174e27bdc8960937"`);
        await queryRunner.query(`ALTER TABLE "blocks" DROP CONSTRAINT "FK_d1ac99d8067bf6fcf5962b1af38"`);
        await queryRunner.query(`ALTER TABLE "social_networks" DROP CONSTRAINT "FK_a8330c2c4cfd08c00e7f64f19a2"`);
        await queryRunner.query(`ALTER TABLE "social_networks" DROP CONSTRAINT "FK_8a7ee903801b9b168b766d5490b"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_beb91b101db32ac72ac8ae3fefe"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_caa161d96eaa904c6bc3c83f2bd"`);
        await queryRunner.query(`ALTER TABLE "participations" DROP CONSTRAINT "FK_db064f688ab0c9d3d29ff65dcd0"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_ccc95d911d2b1e4ea171923893d"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_389b662d0b626b48a1ce4e2c8f8"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_bcb2ce0072504d624725e3ef826"`);
        await queryRunner.query(`ALTER TABLE "event_pictures" DROP CONSTRAINT "FK_9c0f6b0596a661929a184d87522"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_d5643c2d498bd247a29670cc519"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_5d45095abb492e416c4cca90b84"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_af66c04d96c3fd3ba7612fdf5e9"`);
        await queryRunner.query(`ALTER TABLE "emojis" DROP CONSTRAINT "FK_e627291c8f9ba13130231cf2f34"`);
        await queryRunner.query(`ALTER TABLE "emojis" DROP CONSTRAINT "FK_d89344bcb6fc6eca6dd406e3dd9"`);
        await queryRunner.query(`ALTER TABLE "emojis" DROP CONSTRAINT "FK_683569193071276245fcf3ca4d1"`);
        await queryRunner.query(`ALTER TABLE "emojis" DROP CONSTRAINT "FK_454c6e2124e1034893c9822336f"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_ba4018856eb613bc876bbf5f6e6"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_abaf9606bfc0ed79d603c3f0683"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_ced5a2135031aaf0300206cd93b"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_cca22a79492216c7c08f8773d8d"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_e6f5aea2073c03cb60231b0b4e8"`);
        await queryRunner.query(`ALTER TABLE "friendships" DROP CONSTRAINT "FK_2838df119e620b5c762aca5f5a9"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`DROP TABLE "achievements"`);
        await queryRunner.query(`DROP TABLE "achievement_types"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "suggestions"`);
        await queryRunner.query(`DROP TABLE "blocks"`);
        await queryRunner.query(`DROP TABLE "social_networks"`);
        await queryRunner.query(`DROP TABLE "social_network_types"`);
        await queryRunner.query(`DROP TABLE "participations"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "event_pictures"`);
        await queryRunner.query(`DROP TABLE "event_types"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TABLE "emojis"`);
        await queryRunner.query(`DROP TABLE "emoji_types"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "friendships"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
