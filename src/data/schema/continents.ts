import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './common/columns.helpers';

export const continents = pgTable('continents', {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 5 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),

    ...timestamps,
});
