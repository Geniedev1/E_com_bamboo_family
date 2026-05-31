#!/bin/bash
# deploy.sh - Script deploy production lên EC2
# Chạy trên EC2: bash deploy.sh
# Hoặc từ máy local (cần SSH): ssh ec2-user@<EC2_IP> 'bash -s' < deploy.sh

set -e  # Dừng nếu có lỗi

echo "======================================"
echo "  🚀 Bắt đầu deploy..."
echo "======================================"

# ===== 1. Build React frontend =====
echo ""
echo "📦 [1/5] Build React frontend..."
cd frontend
npm install --silent
REACT_APP_API_BASE_URL="" npm run build
cd ..
echo "✅ Frontend build xong!"

# ===== 2. Build Docker images =====
echo ""
echo "🐳 [2/5] Build Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache backend
echo "✅ Docker images built!"

# ===== 3. Dừng containers cũ =====
echo ""
echo "🛑 [3/5] Dừng containers cũ..."
docker-compose -f docker-compose.prod.yml down --remove-orphans || true
echo "✅ Stopped!"

# ===== 4. Khởi động containers mới =====
echo ""
echo "▶️  [4/5] Khởi động containers..."
docker-compose -f docker-compose.prod.yml up -d
echo "✅ Containers started!"

# ===== 5. Kiểm tra health =====
echo ""
echo "🔍 [5/5] Kiểm tra health (chờ 30 giây)..."
sleep 30
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Tất cả containers đang chạy!"
    docker-compose -f docker-compose.prod.yml ps
else
    echo "❌ Có container không chạy! Kiểm tra logs:"
    docker-compose -f docker-compose.prod.yml logs --tail=50
    exit 1
fi

echo ""
echo "======================================"
echo "  ✅ Deploy thành công!"
echo "======================================"
