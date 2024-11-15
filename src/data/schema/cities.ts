import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './common/columns.helpers';

export const cities = pgTable('cities', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    postal: varchar('postal', { length: 60 }),
    locode: varchar('locode', { length: 10 }),
    areacode: varchar('areacode', { length: 10 }),
    cordinates: varchar('cordinates', { length: 15 }),
    
    ...timestamps,
});
