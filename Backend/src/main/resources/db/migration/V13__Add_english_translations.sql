-- Thêm cột dịch tiếng Anh cho product (tên + mô tả) và category (mô tả) để FE hiển thị
-- đúng ngôn ngữ khi người dùng chuyển sang English. Category.name đã sẵn tiếng Anh
-- (vd "Storage Baskets") nên không cần cột riêng.
-- Bản dịch backfill dưới đây là bản dịch tạm thời cho 12 sản phẩm/6 danh mục mẫu ban đầu,
-- admin nên rà soát/chỉnh lại cho chuẩn khi có thời gian (giống cách làm ở V12 với kích thước).

ALTER TABLE product ADD COLUMN product_title_en VARCHAR(255);
ALTER TABLE product ADD COLUMN top_description_en VARCHAR(255);
ALTER TABLE product ADD COLUMN base_description_en VARCHAR(255);
ALTER TABLE product ADD COLUMN description_en VARCHAR(255);

ALTER TABLE category ADD COLUMN description_en VARCHAR(500);

UPDATE product SET product_title_en = 'Rattan pendant lamp',
    top_description_en = 'Hand-woven rattan pendant lamp, warm soft light for the living room.',
    base_description_en = 'Natural rattan, metal frame; wipe with a dry cloth.',
    description_en = 'Handmade rattan pendant lamp.'
    WHERE product_title = 'Đèn mây thả trần';

UPDATE product SET product_title_en = 'Cylindrical rattan lamp',
    top_description_en = 'Cylindrical rattan lampshade, fits any minimalist space.',
    base_description_en = 'Tightly woven rattan strips, pre-wired.',
    description_en = 'Hand-woven cylindrical rattan lamp.'
    WHERE product_title = 'Đèn mây hình trụ';

UPDATE product SET product_title_en = 'Rattan sphere chandelier',
    top_description_en = 'Set of rattan sphere lamps in various sizes, an artistic accent.',
    base_description_en = 'Natural rattan and bamboo, suits high ceilings.',
    description_en = 'Decorative rattan sphere chandelier.'
    WHERE product_title = 'Chùm đèn cầu mây';

UPDATE product SET product_title_en = 'Rattan basket with handle',
    top_description_en = 'Rattan basket with carry handle, for storage or decor.',
    base_description_en = 'Durable rattan, load-bearing, mold-resistant treatment.',
    description_en = 'Hand-woven rattan basket with handle.'
    WHERE product_title = 'Giỏ mây quai xách';

UPDATE product SET product_title_en = 'Round bamboo tray',
    top_description_en = 'Traditional round bamboo tray, for wall decor or serving.',
    base_description_en = 'Hand-woven bamboo, mold-resistant treatment.',
    description_en = 'Handmade round bamboo tray.'
    WHERE product_title = 'Mẹt tre tròn';

UPDATE product SET product_title_en = 'Rattan serving tray',
    top_description_en = 'Rattan serving tray for tea or coffee, with raised sides and handles.',
    base_description_en = 'Natural rattan, wipe with a damp cloth.',
    description_en = 'Hand-woven rattan serving tray.'
    WHERE product_title = 'Khay mây phục vụ';

UPDATE product SET product_title_en = 'Sunburst rattan mirror',
    top_description_en = 'Round mirror with radiating rattan strips, an accent piece for the living room wall.',
    base_description_en = 'Natural rattan frame, real glass mirror; wipe gently dry.',
    description_en = 'Sunburst-style decorative rattan mirror.'
    WHERE product_title = 'Gương mây mặt trời';

UPDATE product SET product_title_en = 'Decorative rattan vase',
    top_description_en = 'Glass vase wrapped in rattan mesh, for dried flowers or decor.',
    base_description_en = 'Hand-woven outer rattan layer, removable for easy cleaning.',
    description_en = 'Decorative tabletop rattan vase.'
    WHERE product_title = 'Bình mây trang trí';

UPDATE product SET product_title_en = 'Rattan plant basket',
    top_description_en = 'Rattan basket cover for plant pots, suits monstera and pothos.',
    base_description_en = 'Durable rattan with a waterproof lining; for indoor use.',
    description_en = 'Rattan plant basket / pot cover.'
    WHERE product_title = 'Giỏ trồng cây mây';

UPDATE product SET product_title_en = 'Rattan-wrapped planter',
    top_description_en = 'Small planter wrapped in woven rattan, for a desk or bookshelf.',
    base_description_en = 'Natural-colored woven rattan fiber; avoid prolonged moisture.',
    description_en = 'Mini rattan-wrapped planter.'
    WHERE product_title = 'Chậu cây bọc mây';

UPDATE product SET product_title_en = 'Bathroom towel basket',
    top_description_en = 'Shallow rattan basket for towels and bathroom accessories, tidy and neat.',
    base_description_en = 'Hand-woven rattan and bamboo, breathable, mold-resistant.',
    description_en = 'Rattan bathroom towel basket.'
    WHERE product_title = 'Giỏ đựng khăn tắm';

UPDATE product SET product_title_en = 'Tall rattan laundry basket',
    top_description_en = 'Tall rattan laundry basket, large capacity, with carry handles.',
    base_description_en = 'Sturdy natural rattan, load-bearing.',
    description_en = 'Tall rattan laundry basket.'
    WHERE product_title = 'Giỏ giặt mây cao';

UPDATE category SET description_en = 'Storage baskets, laundry baskets, lidded baskets, picnic baskets'
    WHERE name = 'Storage Baskets';
UPDATE category SET description_en = 'Trays, bamboo trays, tea trays, tissue boxes, storage boxes'
    WHERE name = 'Trays & Organizers';
UPDATE category SET description_en = 'Mirrors, wall decor, decorative vases, home accents'
    WHERE name = 'Home Decor';
UPDATE category SET description_en = 'Pendant lamps, table lamps, lampshades'
    WHERE name = 'Lighting';
UPDATE category SET description_en = 'Plant baskets, rattan-wrapped planters, hanging baskets'
    WHERE name = 'Planters';
UPDATE category SET description_en = 'Laundry baskets, bathroom trays, toiletry storage boxes'
    WHERE name = 'Laundry & Bathroom';
