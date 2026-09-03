#!/usr/bin/env bash
# Tạo file .env cho production: tự sinh các secret NỘI BỘ (JWT, mật khẩu DB) ngẫu nhiên.
# Các secret NGOÀI (Gmail, Google OAuth) phải tự điền vì gắn với tài khoản của bạn.
# Chạy MỘT lần, TRƯỚC khi 'docker compose up' lần đầu (DB volume còn trống).
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f .env ]; then
    echo "❌ .env đã tồn tại — dừng lại để không ghi đè. Xóa/đổi tên nó nếu muốn tạo lại."
    exit 1
fi

cp .env.prod.example .env

# Sinh secret ngẫu nhiên
JWT="$(openssl rand -hex 32)"
DBPASS="$(openssl rand -hex 16)"

# Thay vào .env (dùng | làm phân tách để không đụng ký tự đặc biệt)
sed -i.bak "s|^JWT_SECRET=.*|JWT_SECRET=${JWT}|" .env
sed -i.bak "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=${DBPASS}|" .env
rm -f .env.bak

echo "✅ Đã tạo .env với JWT_SECRET và POSTGRES_PASSWORD ngẫu nhiên."
echo
echo "⚠️  CÒN LẠI cần bạn điền tay trong .env (mở: nano .env):"
echo "    - MAIL_USERNAME / MAIL_PASSWORD   (Gmail + App Password 16 ký tự)"
echo "    - GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET  (Google Cloud Console)"
echo
echo "   (Có thể để nguyên placeholder Gmail/Google nếu chưa cần: app vẫn chạy,"
echo "    đăng nhập bằng email hoạt động, chỉ tính năng gửi mail / login Google là tắt.)"
