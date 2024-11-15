import { pgTable, serial, varchar, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { countries } from './countries';
import { timestamps } from './common/columns.helpers';

export const brands = pgTable('brands', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),

    countryId: numeric('country_id').references(() => countries.id),
    ...timestamps,
});

export const brandsRelations = relations(brands, ({ one }) => ({
    country: one(countries, {
        fields: [brands.countryId],
        references: [countries.id],
    }),
}));