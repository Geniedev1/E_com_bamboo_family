-- Thêm kích thước có cấu trúc (dài / rộng / cao / đường kính) thay vì 1 chuỗi tự do "volume".
-- Sản phẩm nào không áp dụng chiều nào thì giữ mặc định 0 (frontend sẽ ẩn field = 0).
ALTER TABLE product
    ADD COLUMN length_cm   INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN width_cm    INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN height_cm   INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN diameter_cm INTEGER NOT NULL DEFAULT 0;

-- Map lại giá trị "volume" cũ (chỉ 1 số, không rõ là chiều nào) sang đúng chiều phù hợp
-- với từng loại sản phẩm. Đây là suy đoán hợp lý dựa theo tên/mô tả sản phẩm, không phải
-- số đo thật từ nhà cung cấp - admin có thể sửa lại chính xác qua trang Sửa sản phẩm.
UPDATE product SET diameter_cm = 40 WHERE product_title = 'Đèn mây thả trần';
UPDATE product SET diameter_cm = 35 WHERE product_title = 'Đèn mây hình trụ';
UPDATE product SET diameter_cm = 45 WHERE product_title = 'Chùm đèn cầu mây';
UPDATE product SET height_cm   = 30 WHERE product_title = 'Giỏ mây quai xách';
UPDATE product SET diameter_cm = 35 WHERE product_title = 'Mẹt tre tròn';
UPDATE product SET length_cm   = 40 WHERE product_title = 'Khay mây phục vụ';
UPDATE product SET diameter_cm = 60 WHERE product_title = 'Gương mây mặt trời';
UPDATE product SET height_cm   = 25 WHERE product_title = 'Bình mây trang trí';
UPDATE product SET height_cm   = 35 WHERE product_title = 'Giỏ trồng cây mây';
UPDATE product SET height_cm   = 20 WHERE product_title = 'Chậu cây bọc mây';
UPDATE product SET diameter_cm = 40 WHERE product_title = 'Giỏ đựng khăn tắm';
UPDATE product SET height_cm   = 55 WHERE product_title = 'Giỏ giặt mây cao';
