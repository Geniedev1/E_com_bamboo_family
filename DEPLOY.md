# Triển khai production — rattanovi.com

Stack: PostgreSQL + Spring Boot + Nginx (React static) qua `docker-compose.prod.yml`.
Catalogue mẫu (12 sản phẩm mây tre + 6 danh mục) được seed tự động bằng Flyway (V8, V9),
ảnh đóng gói trong `Backend/.../static/images/` nên deploy mới đã có sẵn sản phẩm.

## 0. Chuẩn bị
- 1 server (VD Ubuntu) đã cài **Docker + Docker Compose plugin**.
- Trỏ DNS `rattanovi.com` và `www.rattanovi.com` về IP server.
- **Google OAuth**: tạo OAuth Client (Web) ở Google Cloud Console, thêm
  Authorized redirect URI: `https://rattanovi.com/login/oauth2/code/google`.
- **Gmail App Password** cho tài khoản gửi mail (bật 2FA rồi tạo app password 16 ký tự).

## 1. Lấy mã nguồn + cấu hình biến môi trường
```bash
git clone <repo> && cd E_com_bamboo_family
git checkout feature/lite-core
cp .env.prod.example .env
nano .env        # điền POSTGRES_PASSWORD, JWT_SECRET, MAIL_*, GOOGLE_* (xem chú thích trong file)
```

## 2. Build frontend (bản production)
Bản build được nginx phục vụ từ `frontend/build`. `.env.production` đã trỏ API về
`https://rattanovi.com`.
```bash
cd frontend
npm ci
NODE_OPTIONS=--openssl-legacy-provider npm run build
cd ..
```

## 3. Chạy stack (HTTP trước — hoạt động ngay)
```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```
- Backend tự chạy Flyway V1→V9: tạo schema + seed 6 danh mục + 12 sản phẩm.
- Kiểm tra: mở `http://rattanovi.com` → trang Sản phẩm đã có 12 mặt hàng.
- Tài khoản admin mặc định: `admin@gmail.com` / `admin` (đổi mật khẩu sau khi vào).

## 4. Bật HTTPS (khuyến nghị — Google OAuth cần HTTPS)
Xin chứng chỉ Let's Encrypt (một trong hai cách):
```bash
# Cách nhanh: tạm dừng nginx, dùng certbot standalone
docker compose -f docker-compose.prod.yml stop nginx
docker run --rm -p 80:80 -v /etc/letsencrypt:/etc/letsencrypt certbot/certbot \
  certonly --standalone -d rattanovi.com -d www.rattanovi.com --agree-tos -m ban@rattanovi.com -n
```
Sau đó sửa `nginx/nginx.conf` theo hướng dẫn ghi trong file (BƯỚC 2):
- Uncomment block redirect 80→443.
- Ở server chính: đổi `listen 80;` → `listen 443 ssl; listen [::]:443 ssl;` và uncomment 4 dòng `ssl_*`.
Rồi khởi động lại:
```bash
docker compose -f docker-compose.prod.yml up -d
```
Chứng chỉ ở `/etc/letsencrypt` đã được mount sẵn vào container nginx.

## 5. Dữ liệu & vận hành
- **Bền vững**: DB ở volume `postgres_data`, ảnh admin upload ở `backend_uploads`. `docker compose stop/up` không mất; chỉ `down -v` mới xóa volume.
- **Ảnh sản phẩm mẫu** nằm trong JAR (`/static/images/...`) nên luôn có, không phụ thuộc volume.
- **Sao lưu DB**: `docker exec shop_postgres pg_dump -U <user> <db> > backup.sql`.
- Cập nhật: `git pull`, build lại frontend, `docker compose -f docker-compose.prod.yml up -d --build`.

## Còn tồn (không chặn deploy)
- Form đánh giá (Reviews) ở trang chi tiết sản phẩm còn tiếng Anh.
- Bộ lọc "Chất liệu" ở trang Sản phẩm chưa lọc thật (chưa có trường dữ liệu).
