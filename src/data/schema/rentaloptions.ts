import { pgTable, numeric, boolean, varchar, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './columns.helpers';
import { currencies } from './currencies';
import { agencies } from './agencies';

export const rentalOptions = pgTable('rentaloptions', {
    id: serial('id').primaryKey(),
    available: boolean('available').notNull(),
    insuranceIncluded: boolean('insuranceincluded').notNull(),
    fuelPolicy: varchar('fuelpolicy', { length: 50 }).notNull(),
    weeklyRate: numeric('weeklyrate', { precision: 10, scale: 2 }),
    monthlyRate: numeric('monthlyrate', { precision: 10, scale: 2 }),
    dailyRate: numeric('dailyrate', { precision: 10, scale: 2 }).notNull(),
    mileageLimit: numeric('mileagelimit', { precision: 10, scale: 0 }).notNull(),
    extraMileageCharge: numeric('extramileagecharge', { precision: 10, scale: 2 }).notNull(),

    currencyId: numeric('currency_id').references(() => currencies.id).notNull(),
    dropoffLocationId: numeric('dropoff_location_id').references(() => agencies.id),
    pickupLocationId: numeric('pickuplocation_id').references(() => agencies.id).notNull(),
    ...timestamps

});
export const rentalOptionsRelations = relations(rentalOptions, ({ one }) => ({
    currency: one(currencies, {
        fields: [rentalOptions.currencyId],
        references: [currencies.id],
    }),
    pickupLocation: one(agencies, {
        fields: [rentalOptions.pickupLocationId],
        references: [agencies.id],
    }),
    dropoffLocation: one(agencies, {
        fields: [rentalOptions.dropoffLocationId],
        references: [agencies.id],
    })
}));