CREATE TABLE IF NOT EXISTS "brewer" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"method" text NOT NULL,
	"image" text,
	"notes" text,
	"user_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
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
	"rating" smallint,
	"image" text,
	"notes" text,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grinder" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"notes" text,
	"image" text,
	"user_id" uuid,
	"id" uuid DEFAULT gen_random_uuid()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
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
	"coffee_rating" smallint,
	"coffee_notes" text,
	"grinder_name" text,
	"grinder_notes" text,
	"brewer_name" text,
	"brewer_method" text,
	"brewer_image" text,
	"brewer_notes" text,
	"water_hardness" text,
	"grind_size" text,
	"grind_duration" real,
	"grind_weight" real,
	"grind_image" text,
	"grind_notes" text,
	"instruction_pre_infusion_duration" real,
	"instruction_extraction_duration" real,
	"instruction_weight" real,
	"instruction_temperature" real,
	"instruction_pressure" real,
	"instruction_notes" text,
	"name" text NOT NULL,
	"flavours" text[] NOT NULL,
	"rating" smallint,
	"image" text,
	"notes" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"weight_measurement" text,
	"temperature_measurement" text,
	"user_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
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
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT auth.uid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"weight" text,
	"temperature" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "brewer_id_key" ON "brewer" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "coffee_id_key" ON "coffee" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "grinder_id_key" ON "grinder" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "suggestion_id_key" ON "suggestion" ("id");