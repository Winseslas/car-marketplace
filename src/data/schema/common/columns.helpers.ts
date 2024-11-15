import { char, timestamp, varchar } from 'drizzle-orm/pg-core';

export const timestamps = {
    updated: timestamp("updated"),
    created: timestamp("created").defaultNow().notNull(),
    description: varchar('description', { length: 255 }),
    isactive: char('isactive', { length: 1 }).notNull().default('Y'),
}