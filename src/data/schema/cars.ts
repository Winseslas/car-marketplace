import { pgTable, serial, varchar, numeric, text, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './columns.helpers';
import { brands } from './brands';
import { currencies } from './currencies';
import { rentalOptions } from './rentaloptions';
import { carFeatures } from './carfeatures';
import { categories } from './categories';

export const conditionEnum = pgEnum('condition', ['New', 'Used', 'Certified Pre-Owned']);
export const driveTypeEnum = pgEnum('drive', ['FWD', 'RWD', 'AWD', '4WD']);


export const cars = pgTable('cars', {
    id: serial('id').primaryKey(),
    imageUrl: text('imageurl').notNull(),
    driveType: driveTypeEnum('drive').notNull(),
    condition: conditionEnum('condition').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    year: numeric('year', { precision: 4, scale: 0 }).notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    sellingPrice: numeric('sellingprice', { precision: 10, scale: 2 }).notNull(),

    brandId: numeric('brand_id').references(() => brands.id).notNull(),
    currencyId: numeric('currency_id').references(() => currencies.id).notNull(),
    categoryId: numeric('category_id').references(() => categories.id).notNull(),
    rentalOptionsId: numeric('rentaloptions_id').references(() => rentalOptions.id),
    carFeaturesId: numeric('carfeatures_id').references(() => carFeatures.id).notNull(),
    ...timestamps
});

export const carsRelations = relations(cars, ({ one }) => ({
    brand: one(brands, {
        fields: [cars.brandId],
        references: [brands.id],
    }),
    currency: one(currencies, {
        fields: [cars.currencyId],
        references: [currencies.id],
    }),
    rentalOptions: one(rentalOptions, {
        fields: [cars.rentalOptionsId],
        references: [rentalOptions.id],
    }),
    features: one(carFeatures, {
        fields: [cars.carFeaturesId],
        references: [carFeatures.id],
    }),
    category: one(categories, {
        fields: [cars.categoryId],
        references: [categories.id],
    })
}));