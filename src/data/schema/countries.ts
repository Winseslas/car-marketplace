import { pgTable, numeric, varchar, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './columns.helpers';
import { currencies } from './currencies';
import { continents } from './continents';

export const countries = pgTable('countries', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    symbol: varchar('symbol', { length: 20 }).notNull(), 
    countryCode: varchar('countryCode', { length: 5 }).notNull(),
    phoneCode: numeric('phoneCode', { precision: 10, scale: 0 }).notNull(),
    
    currencyId: numeric('currency_id').references(() => currencies.id),
    continentId: numeric('continent_id').references(() => continents.id),
    ...timestamps,
});

export const countriesRelations = relations(countries, ({ one }) => ({
    currency: one(currencies, {
        fields: [countries.currencyId],
        references: [currencies.id],
    }),
    continent: one(continents, {
        fields: [countries.continentId], 
        references: [continents.id],
    }),
}));

export const currenciesRelations = relations(currencies, ({ many }) => ({
    countries: many(countries)
}));

export const continentsRelations = relations(continents, ({ many }) => ({
    countries: many(countries)
}));