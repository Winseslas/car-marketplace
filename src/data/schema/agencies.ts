import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './common/columns.helpers';
import { cities } from './cities';
import { relations } from 'drizzle-orm';

export const agencies = pgTable('agencies', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    contactNumber: varchar('contact_number', { length: 50 }).notNull(),
    
    cityId: integer('city_id').references(() => cities.id),
    ...timestamps
});

export const agenciesRelations = relations(agencies, ({ one }) => ({
    city: one(cities, {
        fields: [agencies.cityId],
        references: [cities.id],
    })
}));