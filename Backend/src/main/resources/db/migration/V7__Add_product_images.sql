-- Hỗ trợ nhiều ảnh cho mỗi sản phẩm (tối đa 5, kiểm soát ở tầng ứng dụng).
-- filename vẫn là ảnh bìa (images[0]) để tương thích ngược.
CREATE TABLE product_images (
    product_id  BIGINT       NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    image_url   VARCHAR(1024),
    image_order INTEGER      NOT NULL,
    PRIMARY KEY (product_id, image_order)
);

-- Backfill: mỗi sản phẩm đang có 1 ảnh (filename) -> đưa vào làm ảnh đầu tiên.
INSERT INTO product_images (product_id, image_url, image_order)
SELECT id, filename, 0
FROM product
WHERE filename IS NOT NULL;
