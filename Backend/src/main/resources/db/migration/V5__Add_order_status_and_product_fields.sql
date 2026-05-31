-- V5: Add order status, order note, product stock/category/status fields

-- Orders: add status and customer note
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_status VARCHAR(20) DEFAULT 'PENDING';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS note VARCHAR(1000);

-- Update existing orders to have PENDING status
UPDATE orders SET order_status = 'PENDING' WHERE order_status IS NULL;

-- Products (perfume): add inventory and category management
ALTER TABLE perfume ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;
ALTER TABLE perfume ADD COLUMN IF NOT EXISTS category VARCHAR(255);
ALTER TABLE perfume ADD COLUMN IF NOT EXISTS product_status VARCHAR(50) DEFAULT 'ACTIVE';

-- Update existing products to have ACTIVE status
UPDATE perfume SET product_status = 'ACTIVE' WHERE product_status IS NULL;
