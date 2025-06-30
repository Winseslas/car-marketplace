import { pgTable, boolean, integer, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from './common/columns.helpers';

export const transmissionEnum = pgEnum('transmissionEnum', ['Manual', 'Automatic']);

export const carFeatures = pgTable('carfeatures', {
    id: integer('id').primaryKey(),
    seats: integer('seats').default(2),
    doors: integer('doors').default(2),
    luggageCapacity: integer('luggage_capacity').notNull(),
    transmission: transmissionEnum('transmissionEnum').notNull(),
    fuelType: varchar('fuel_type', { length: 50 }).notNull(),
    gps: boolean('gps').notNull(),
    bluetooth: boolean('bluetooth').notNull(),
    airConditioning: boolean('air_conditioning').notNull(),

    ...timestamps
});