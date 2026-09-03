# 🚀 Hướng Dẫn Deploy Lên AWS EC2

## Kiến trúc

```
Internet → Cloudflare Pages (Frontend React)
         → EC2 (Nginx :80) → Spring Boot :8080 → PostgreSQL :5432
```

---

## Bước 1: Tạo EC2 Instance

1. Vào AWS Console → EC2 → Launch Instance
2. Chọn **Amazon Linux 2023** (hoặc Ubuntu 22.04)
3. Instance type: **t2.micro** (free tier) hoặc **t3.small** nếu cần hơn
4. Storage: **20 GB** (gp3)
5. **Security Group** — Mở các port:
   - SSH: 22 (chỉ từ IP của bạn)
   - HTTP: 80 (0.0.0.0/0)
   - HTTPS: 443 (0.0.0.0/0)
6. Tạo key pair `.pem`, lưu kỹ
7. Launch!

---

## Bước 2: Kết nối vào EC2

```bash
# Phân quyền key
chmod 400 your-key.pem

# SSH vào EC2
ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>
```

---

## Bước 3: Cài Docker và Docker Compose

```bash
# Cập nhật system
sudo yum update -y   # Amazon Linux
# Hoặc: sudo apt update && sudo apt upgrade -y   # Ubuntu

# Cài Docker
sudo yum install -y docker   # Amazon Linux
# Hoặc: sudo apt install -y docker.io   # Ubuntu

# Khởi động Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra
docker --version
docker-compose --version

# Logout và login lại để áp dụng group docker
exit
```

---

## Bước 4: Clone Project và Config

```bash
# Clone project
git clone https://github.com/your-username/ecommerce-spring-reactjs.git
cd ecommerce-spring-reactjs

# Tạo file .env từ example
cp .env.example .env

# Điền thông tin thật vào .env
nano .env
# Hoặc: vi .env
```

Nội dung `.env` cần điền:

```
POSTGRES_DB=shopdb
POSTGRES_USER=shopuser
POSTGRES_PASSWORD=<strong-password>
JWT_SECRET=<long-random-string>
FRONTEND_URL=yourdomain.com   # hoặc EC2 IP nếu chưa có domain
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=<gmail-app-password>
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
AWS_S3_BUCKET=...
AWS_REGION=ap-southeast-1
# ... các OAuth2 keys nếu dùng
```

---

## Bước 5: Deploy Frontend lên Cloudflare Pages

1. Commit toàn bộ code mới nhất của bạn (sau khi đã cấu hình) lên một GitHub Repository.
2. Đăng nhập vào Cloudflare, chọn mục **Pages**.
3. Bấm **Create a project** -> **Connect to Git**.
4. Chọn repo chứa code của bạn, chọn nhánh `lite-core`.
5. Cấu hình Build settings:
   - Framework preset: `Create React App`
   - Build command: `npm run build`
   - Build output directory: `build`
6. Thêm biến môi trường (Environment variables):
   - Key: `REACT_APP_API_BASE_URL` | Value: `https://api.yourdomain.com` (Đổi thành domain Backend của bạn).
7. Bấm **Save and Deploy**. Chờ 2 phút là bạn đã có giao diện siêu tốc!

---

## Bước 6: Deploy

```bash
chmod +x deploy.sh
./deploy.sh

# Hoặc thủ công:
docker-compose -f docker-compose.prod.yml up -d
```

---

## Bước 7: Cấu hình SSL qua Cloudflare (Flexible SSL)

Thay vì cài đặt Let's Encrypt (Certbot) phức tạp trên server, chúng ta sẽ tận dụng Cloudflare để tự động cấp phát SSL miễn phí và an toàn.

1. Đăng nhập vào tài khoản **Cloudflare** của bạn.
2. Tại mục **DNS**, tạo bản ghi (A record) trỏ từ Domain của bạn về IP Public của EC2, bật cờ cam (Proxied).
   - `@` → `<EC2_PUBLIC_IP>` (Proxied)
   - `www` → `<EC2_PUBLIC_IP>` (Proxied)
3. Chuyển sang mục **SSL/TLS** (bên menu trái).
4. Chọn chế độ **Flexible**. Ở chế độ này, giao tiếp từ Người dùng ↔ Cloudflare sẽ được mã hóa bằng HTTPS, còn từ Cloudflare ↔ EC2 (Nginx) sẽ qua HTTP (port 80).
5. Đảm bảo cấu hình Nginx trong `docker-compose.prod.yml` chỉ cần map cổng 80 (đã có sẵn `80:80`).
6. Chờ vài phút để Cloudflare áp dụng chứng chỉ SSL. Giờ bạn đã có thể truy cập bằng `https://yourdomain.com` mà không cần cài thêm gì trên máy chủ!

---

## Bước 8: Backup PostgreSQL định kỳ

```bash
# Tạo script backup
cat > /home/ec2-user/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/home/ec2-user/backups
mkdir -p $BACKUP_DIR

docker exec shop_postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Xóa backup cũ hơn 7 ngày
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
echo "Backup completed: $BACKUP_DIR/db_$DATE.sql.gz"
EOF

chmod +x /home/ec2-user/backup-db.sh

# Chạy tự động mỗi ngày lúc 2AM
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ec2-user/backup-db.sh >> /home/ec2-user/backup.log 2>&1") | crontab -
```

---

## Lệnh hữu ích hàng ngày

```bash
# Xem logs backend
docker-compose -f docker-compose.prod.yml logs -f backend

# Xem logs nginx
docker-compose -f docker-compose.prod.yml logs -f nginx

# Xem tất cả containers
docker-compose -f docker-compose.prod.yml ps

# Restart một service cụ thể
docker-compose -f docker-compose.prod.yml restart backend

# Xem dung lượng disk
df -h

# Xem RAM
free -h

# Vào PostgreSQL
docker exec -it shop_postgres psql -U shopuser -d shopdb

# Update code (pull + rebuild)
git pull
./deploy.sh
```

---

## Trỏ Domain về EC2

Nếu dùng domain (khuyên dùng):

1. Lấy **Public IP** của EC2 trong AWS Console
2. Vào DNS provider → thêm **A record**:
   - `@` → `<EC2_PUBLIC_IP>`
   - `www` → `<EC2_PUBLIC_IP>`
3. Chờ ~5-15 phút để DNS propagate

> ⚠️ **Lưu ý**: EC2 free tier có Public IP thay đổi khi restart. Để IP cố định, dùng **Elastic IP** (miễn phí khi đang dùng, trả phí khi không dùng).

---

## Chi phí ước tính

| Dịch vụ | Chi phí |
| --- | --- |
| EC2 t2.micro | **Miễn phí** 12 tháng (free tier) |
| EC2 t3.small | ~$15-20/tháng |
| S3 (ảnh) | $0.023/GB/tháng |
| Elastic IP | Miễn phí khi attach EC2 |
| Domain | ~$10-15/năm (Route 53 hoặc nơi khác) |
| SSL (Let's Encrypt) | **Miễn phí** |
