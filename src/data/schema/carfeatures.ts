import { pgTable, boolean, integer, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';

const transmissionEnum = pgEnum('transmission', ['Manual', 'Automatic']);

export const carFeatures = pgTable('carfeatures', {
    id: integer('id').primaryKey(),
    seats: integer('seats').default(2),
    doors: integer('doors').default(2),
    luggageCapacity: integer('luggagecapacity').notNull(),
    transmission: transmissionEnum('transmission').notNull(),
    fuelType: varchar('fueltype', { length: 50 }).notNull(),
    gps: boolean('gps').notNull(),
    bluetooth: boolean('bluetooth').notNull(),
    airConditioning: boolean('airconditioning').notNull(),

    ...timestamps
});