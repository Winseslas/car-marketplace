import { serial, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),

  ...timestamps,
});