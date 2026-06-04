-- V6: Rename legacy perfume schema to generic product naming.

ALTER TABLE IF EXISTS perfume RENAME TO product;
ALTER SEQUENCE IF EXISTS perfume_id_seq RENAME TO product_id_seq;

ALTER TABLE IF EXISTS product RENAME COLUMN perfume_title TO product_title;
ALTER TABLE IF EXISTS product RENAME COLUMN perfumer TO vendor;
ALTER TABLE IF EXISTS product RENAME COLUMN perfume_gender TO gender;
ALTER TABLE IF EXISTS product RENAME COLUMN fragrance_top_notes TO top_description;
ALTER TABLE IF EXISTS product RENAME COLUMN fragrance_middle_notes TO middle_description;
ALTER TABLE IF EXISTS product RENAME COLUMN fragrance_base_notes TO base_description;
ALTER TABLE IF EXISTS product RENAME COLUMN perfume_rating TO product_rating;

ALTER TABLE IF EXISTS order_item RENAME COLUMN perfume_id TO product_id;

ALTER TABLE IF EXISTS perfume_reviews RENAME TO product_reviews;
ALTER TABLE IF EXISTS product_reviews RENAME COLUMN perfume_id TO product_id;
