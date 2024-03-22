import {
  pgTable,
  uniqueIndex,
  timestamp,
  text,
  uuid,
  date,
  real,
  smallint,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const recipe = pgTable("recipe", {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  coffeeName: text("coffee_name"),
  coffeeRoast: text("coffee_roast"),
  coffeeRoastDate: date("coffee_roast_date"),
  coffeeFlavours: text("coffee_flavours").array(),
  coffeeStore: text("coffee_store"),
  coffeeStoreUrl: text("coffee_store_url"),
  coffeePurchaseDate: date("coffee_purchase_date"),
  coffeePurchaseCurrency: text("coffee_purchase_currency"),
  coffeePurchasePrice: real("coffee_purchase_price"),
  coffeeIntensity: smallint("coffee_intensity"),
  coffeeImage: text("coffee_image"),
  coffeeRating: smallint("coffee_rating"),
  coffeeNotes: text("coffee_notes"),
  grinderName: text("grinder_name"),
  grinderNotes: text("grinder_notes"),
  brewerName: text("brewer_name"),
  brewerMethod: text("brewer_method"),
  brewerImage: text("brewer_image"),
  brewerNotes: text("brewer_notes"),
  waterHardness: text("water_hardness"),
  grindSize: text("grind_size"),
  grindDuration: real("grind_duration"),
  grindWeight: real("grind_weight"),
  grindImage: text("grind_image"),
  grindNotes: text("grind_notes"),
  instructionPreInfusionDuration: real("instruction_pre_infusion_duration"),
  instructionExtractionDuration: real("instruction_extraction_duration"),
  instructionWeight: real("instruction_weight"),
  instructionTemperature: real("instruction_temperature"),
  instructionPressure: real("instruction_pressure"),
  instructionNotes: text("instruction_notes"),
  name: text("name").notNull(),
  flavours: text("flavours").array().notNull(),
  rating: smallint("rating"),
  image: text("image"),
  notes: text("notes"),
  isPublic: boolean("is_public").default(false).notNull(),
  weightMeasurement: text("weight_measurement"),
  temperatureMeasurement: text("temperature_measurement"),
  userId: uuid("user_id"),
  id: uuid("id").defaultRandom().primaryKey().notNull(),
});

export const grinder = pgTable(
  "grinder",
  {
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text("name").notNull(),
    notes: text("notes"),
    image: text("image"),
    userId: uuid("user_id"),
    id: uuid("id").defaultRandom(),
  },
  (table) => {
    return {
      idKey: uniqueIndex("grinder_id_key").on(table.id),
    };
  },
);

export const brewer = pgTable(
  "brewer",
  {
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text("name").notNull(),
    method: text("method").notNull(),
    image: text("image"),
    notes: text("notes"),
    userId: uuid("user_id"),
    id: uuid("id").defaultRandom().primaryKey().notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex("brewer_id_key").on(table.id),
    };
  },
);

export const coffee = pgTable(
  "coffee",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text("name").notNull(),
    roast: text("roast").notNull(),
    roastDate: date("roast_date"),
    storeName: text("store_name"),
    storeUrl: text("store_url"),
    purchaseDate: date("purchase_date"),
    purchasePrice: real("purchase_price"),
    purchaseCurrency: text("purchase_currency"),
    intensity: smallint("intensity").notNull(),
    flavours: text("flavours").array().notNull(),
    rating: smallint("rating"),
    image: text("image"),
    notes: text("notes"),
    userId: uuid("user_id").notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex("coffee_id_key").on(table.id),
    };
  },
);

export const user = pgTable("user", {
  id: uuid("id")
    .default(sql`auth.uid()`)
    .primaryKey()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name").notNull(),
  weight: text("weight"),
  temperature: text("temperature"),
});

export const suggestion = pgTable(
  "suggestion",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    component: text("component"),
    image: text("image"),
    suggestion: text("suggestion"),
    userId: uuid("user_id").notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex("suggestion_id_key").on(table.id),
    };
  },
);
