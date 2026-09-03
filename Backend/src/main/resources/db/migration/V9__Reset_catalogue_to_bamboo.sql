-- Đưa catalogue về đúng hàng mây tre cho mọi deploy mới.
-- V3/V4 (seed gốc) chèn ~108 sản phẩm nước hoa + đơn hàng demo. Migration này xóa sạch
-- dữ liệu seed đó rồi chèn 12 sản phẩm mây tre. Ảnh trỏ /static/images/ (đóng gói trong
-- JAR) nên độc lập domain, không phụ thuộc volume uploads. Chạy MỘT lần khi khởi tạo DB.
SET client_encoding TO 'UTF8';

-- 1) Xóa dữ liệu seed cũ (đúng thứ tự khóa ngoại).
DELETE FROM orders_order_items;
DELETE FROM order_item;
DELETE FROM orders;
DELETE FROM product_reviews;
DELETE FROM review;
DELETE FROM product;   -- product_images tự xóa theo (ON DELETE CASCADE)

-- 2) Chèn 12 sản phẩm mây tre.
INSERT INTO product (id, product_title, vendor, price, volume, type, country, gender, year,
                     product_rating, stock_quantity, category_id, product_status,
                     top_description, base_description, description, filename)
SELECT nextval('product_id_seq'), v.product_title, 'Làng Nghề Việt', v.price, v.volume, 'Handmade', 'Việt Nam', 'all', 2024,
       0, v.stock, (SELECT id FROM category WHERE name = v.category), 'ACTIVE',
       v.top_desc, v.base_desc, v.descr, '/static/images/' || v.slug
FROM (VALUES
    ('Đèn mây thả trần', 450, '40', 12, 'Lighting',
     'Đèn thả nan mây đan tay, ánh sáng ấm dịu cho phòng khách.',
     'Mây tự nhiên, khung kim loại; lau bằng khăn khô.', 'Đèn mây thả trần thủ công.', 'den-may-tha-tran.jpg'),
    ('Đèn mây hình trụ', 390, '35', 15, 'Lighting',
     'Chao đèn mây hình trụ, hợp mọi không gian tối giản.',
     'Nan mây đan khít, đã đi dây điện sẵn.', 'Đèn mây hình trụ đan tay.', 'den-may-tru.jpg'),
    ('Chùm đèn cầu mây', 650, '45', 6, 'Lighting',
     'Bộ đèn cầu mây nhiều kích cỡ, tạo điểm nhấn nghệ thuật.',
     'Mây tre tự nhiên, phù hợp trần cao.', 'Chùm đèn cầu mây trang trí.', 'chum-den-cau-may.jpg'),
    ('Giỏ mây quai xách', 180, '30', 20, 'Storage Baskets',
     'Giỏ mây có quai xách, đựng đồ hoặc trang trí.',
     'Mây bền, chịu lực tốt, xử lý chống mốc.', 'Giỏ mây quai xách đan tay.', 'gio-may-quai-xach.jpg'),
    ('Mẹt tre tròn', 120, '35', 25, 'Trays & Organizers',
     'Mẹt tre tròn truyền thống, trang trí tường hoặc bày món.',
     'Tre đan tay, xử lý chống mốc.', 'Mẹt tre tròn thủ công.', 'met-tre-tron.jpg'),
    ('Khay mây phục vụ', 160, '40', 18, 'Trays & Organizers',
     'Khay mây phục vụ trà, cà phê; có thành và tay cầm.',
     'Mây tự nhiên, lau ẩm nhẹ.', 'Khay mây phục vụ đan tay.', 'khay-may-phuc-vu.jpg'),
    ('Gương mây mặt trời', 320, '60', 8, 'Home Decor',
     'Gương tròn viền nan mây tỏa tia, điểm nhấn cho tường phòng khách.',
     'Khung mây tự nhiên, mặt gương thật; lau khô nhẹ nhàng.', 'Gương mây trang trí phong cách mặt trời.', 'guong-may-mat-troi.jpg'),
    ('Bình mây trang trí', 220, '25', 12, 'Home Decor',
     'Bình thủy tinh bọc lưới mây, cắm hoa khô hoặc trang trí.',
     'Lớp mây đan tay bọc ngoài, tháo rời vệ sinh dễ.', 'Bình mây trang trí để bàn.', 'binh-may-trang-tri.jpg'),
    ('Giỏ trồng cây mây', 210, '35', 15, 'Planters',
     'Giỏ mây bọc chậu cây, hợp cây monstera, trầu bà.',
     'Mây bền, có lót chống thấm; đặt trong nhà.', 'Giỏ mây trồng/bọc chậu cây.', 'gio-trong-cay-may.jpg'),
    ('Chậu cây bọc mây', 150, '20', 20, 'Planters',
     'Chậu cây nhỏ bọc mây dệt, để bàn làm việc, kệ sách.',
     'Sợi mây dệt màu tự nhiên; tránh ẩm lâu.', 'Chậu cây mini bọc mây.', 'chau-cay-boc-may.jpg'),
    ('Giỏ đựng khăn tắm', 140, '40', 18, 'Laundry & Bathroom',
     'Giỏ mây nông đựng khăn, phụ kiện phòng tắm gọn gàng.',
     'Tre mây đan tay, thoáng khí, chống ẩm mốc.', 'Giỏ đựng khăn tắm mây.', 'gio-khan-tam.jpg'),
    ('Giỏ giặt mây cao', 280, '55', 10, 'Laundry & Bathroom',
     'Giỏ mây cao đựng đồ giặt, dung tích lớn, có tay xách.',
     'Mây tự nhiên chắc chắn, chịu lực tốt.', 'Giỏ giặt mây cao.', 'gio-giat-may-cao.jpg')
) AS v(product_title, price, volume, stock, category, top_desc, base_desc, descr, slug);

-- 3) Ảnh bìa cho từng sản phẩm.
INSERT INTO product_images (product_id, image_url, image_order)
SELECT id, filename, 0 FROM product;
