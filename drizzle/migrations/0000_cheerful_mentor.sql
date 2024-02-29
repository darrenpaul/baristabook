-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "popularity" AS ENUM('unknown', 'known', 'popular');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brewer" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"method" text NOT NULL,
	"notes" text,
	"user_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coffee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"roast" text NOT NULL,
	"store_name" text,
	"store_url" text,
	"purchase_date" date,
	"purchase_price" real,
	"purchase_currency" text,
	"intensity" smallint NOT NULL,
	"flavours" text[] NOT NULL,
	"image" text,
	"notes" text,
	"user_id" uuid NOT NULL,
	"rating" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grinder" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"notes" text,
	"user_id" uuid,
	"id" uuid DEFAULT gen_random_uuid(),
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"coffee_name" text,
	"coffee_roast" text,
	"coffee_flavours" text[],
	"coffee_store" text,
	"coffee_store_url" text,
	"coffee_purchase_date" date,
	"coffee_purchase_currency" text,
	"coffee_purchase_price" real,
	"coffee_intensity" smallint,
	"coffee_image" text,
	"coffee_notes" text,
	"grinder_name" text,
	"grinder_notes" text,
	"brewer_name" text,
	"brewer_method" text,
	"brewer_notes" text,
	"water_hardness" text,
	"name" text NOT NULL,
	"grind_size" text,
	"grind_duration" real,
	"grind_weight" real,
	"grind_notes" text,
	"rating" smallint,
	"image" text,
	"notes" text,
	"user_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"flavours" text[] NOT NULL,
	"brewer_image" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"instruction_pre_infusion_duration" real,
	"instruction_extraction_duration" real,
	"instruction_weight" real,
	"instruction_temperature" real,
	"instruction_pressure" real,
	"instruction_notes" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"weight_measurement" text,
	"temperature_measurement" text,
	"grind_image" text,
	"coffee_rating" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT auth.uid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"weight" text,
	"temperature" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suggestion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"component" text,
	"image" text,
	"suggestion" text,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "brewer_id_key" ON "brewer" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "coffee_id_key" ON "coffee" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "grinder_id_key" ON "grinder" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "suggestion_id_key" ON "suggestion" ("id");
*/