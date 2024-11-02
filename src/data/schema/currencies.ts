import { pgTable, numeric, char, varchar, timestamp, serial } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';

export const currencies = pgTable('currencies', {
    id: serial('id').primaryKey(),
    isoCode: char('isocode', { length: 3 }).notNull(),
    iseuro: char('iseuro', { length: 1 }).notNull().default('N'),
    isemumember: char('isemumember', { length: 1 }).notNull().default('N'),
    stdprecision: numeric('stdprecision', { precision: 10, scale: 0 }).notNull(),
    costingprecision: numeric('costingprecision', { precision: 10, scale: 0 }).notNull(),
    
    emuentrydate: timestamp('emuentrydate'),
    roundofffactor: numeric('roundofffactor'),
    cursymbol: varchar('cursymbol', { length: 10 }),

    ...timestamps,
});