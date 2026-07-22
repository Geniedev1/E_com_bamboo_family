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

# Sinh .env: JWT_SECRET + POSTGRES_PASSWORD được tạo ngẫu nhiên tự động
bash scripts/setup-env.sh

# Chỉ còn điền tay các secret ngoài (gắn với tài khoản của bạn):
nano .env        # MAIL_USERNAME, MAIL_PASSWORD, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
```
> App vẫn chạy nếu để nguyên placeholder Gmail/Google — đăng nhập bằng email hoạt động,
> chỉ tính năng **gửi mail** và **đăng nhập Google** là tắt cho tới khi điền thật.

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
```bash
# 4.1 Xin chứng chỉ Let's Encrypt (dừng nginx để certbot chiếm cổng 80)
docker compose -f docker-compose.prod.yml stop nginx
docker run --rm -p 80:80 -v /etc/letsencrypt:/etc/letsencrypt certbot/certbot \
  certonly --standalone -d rattanovi.com -d www.rattanovi.com --agree-tos -m admin@rattanovi.com -n

# 4.2 Chuyển sang cấu hình HTTPS đã dựng sẵn rồi bật lại stack
cp nginx/nginx-ssl.conf nginx/nginx.conf
docker compose -f docker-compose.prod.yml up -d
```
Chứng chỉ ở `/etc/letsencrypt` đã mount sẵn vào nginx. `nginx-ssl.conf` tự chuyển
HTTP→HTTPS và bật HSTS.

**Tự gia hạn** (cert hết hạn sau 90 ngày) — thêm cron hằng tháng:
```bash
0 3 1 * * cd /path/E_com_bamboo_family && docker compose -f docker-compose.prod.yml stop nginx && \
  docker run --rm -p 80:80 -v /etc/letsencrypt:/etc/letsencrypt certbot/certbot renew -n && \
  docker compose -f docker-compose.prod.yml up -d nginx
```

## 5. Dữ liệu & vận hành
- **Bền vững**: DB ở volume `postgres_data`, ảnh admin upload ở `backend_uploads`. `docker compose stop/up` không mất; chỉ `down -v` mới xóa volume.
- **Ảnh sản phẩm mẫu** nằm trong JAR (`/static/images/...`) nên luôn có, không phụ thuộc volume.
- **Sao lưu DB**: `docker exec shop_postgres pg_dump -U <user> <db> > backup.sql`.
- Cập nhật: `git pull`, build lại frontend, `docker compose -f docker-compose.prod.yml up -d --build`.

## Còn tồn (không chặn deploy)
- Form đánh giá (Reviews) ở trang chi tiết sản phẩm còn tiếng Anh.
- Bộ lọc "Chất liệu" ở trang Sản phẩm chưa lọc thật (chưa có trường dữ liệu).
