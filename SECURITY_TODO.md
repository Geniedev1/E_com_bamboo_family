# Security TODO

Các việc cần làm để nâng cao bảo mật hạ tầng, phát hiện trong quá trình review ngày 2026-09-04.
Chưa triển khai — ghi lại để làm sau.

## 1. [Cao] Giới hạn AWS Security Group chỉ cho phép IP của Cloudflare

**Vấn đề**: EC2 (`3.25.194.98`) hiện mở port 80/443 cho `0.0.0.0/0`. Đã xác nhận bằng
`curl -k https://3.25.194.98/api/v1/products -H "Host: api.rattanovi.com"` → trả về data thật
(HTTP 200), tức là bất kỳ ai biết IP đều gọi thẳng vào backend, bỏ qua hoàn toàn Cloudflare
(mất WAF, DDoS protection, rate-limit, bot management, cache).

**Cách fix**: Sửa Security Group của EC2 — xoá rule `0.0.0.0/0` cho port 80/443, chỉ cho phép
các dải IP Cloudflare (IPv4 + IPv6, lấy trực tiếp từ `https://www.cloudflare.com/ips-v4` và
`/ips-v6` tại thời điểm làm, vì Cloudflare có thể cập nhật dải này theo thời gian). Giữ nguyên
port 22 (SSH) không đụng vào.

## 2. [Trung bình] Cloudflare Authenticated Origin Pulls (mTLS)

**Vấn đề**: Mục #1 chỉ là whitelist theo IP — có thể bị sửa nhầm/mở lại sau này (dev mới,
script tự động, rebuild instance từ template cũ, traffic nội bộ VPC không qua SG public rule...).

**Cách fix**: Bật xác thực 2 chiều giữa Cloudflare và origin — nginx sẽ đòi client cert mà chỉ
Cloudflare edge có, độc lập với IP nguồn.
- Cloudflare Dashboard → SSL/TLS → Origin Server → bật "Authenticated Origin Pulls"
- nginx.conf: thêm `ssl_verify_client on;` + `ssl_client_certificate <cert CA Cloudflare>;`

⚠️ **Thứ tự bắt buộc**: bật toggle Cloudflare **trước**, deploy nginx **sau** — nếu làm ngược
lại (nginx đòi cert trước khi Cloudflare được dặn gửi cert) toàn bộ site sẽ sập ngay lập tức,
kể cả traffic thật.

## 3. [Thấp] Ẩn version nginx trong response header

**Vấn đề**: Response header trực tiếp từ origin lộ `Server: nginx/1.25.5` — info disclosure nhẹ,
giúp attacker nhắm CVE theo đúng version.

**Cách fix**: thêm `server_tokens off;` vào `http {}` block trong [nginx.conf](nginx/nginx.conf).
Rủi ro gần như bằng 0, có thể làm bất cứ lúc nào.

## 4. [Thấp] DNS thiếu record cho `www.rattanovi.com`

**Vấn đề**: Tra Cloudflare DoH xác nhận `www.rattanovi.com` → NXDOMAIN (không tồn tại DNS record),
dù [nginx.conf](nginx/nginx.conf) và [DEPLOY_AWS.md](DEPLOY_AWS.md) đều giả định đã có. Người dùng
gõ `www.rattanovi.com` sẽ gặp lỗi DNS trên trình duyệt.

**Cách fix**: Vào Cloudflare DNS dashboard, thêm CNAME/A record `www` trỏ về đích tương ứng với
`rattanovi.com` (Cloudflare Pages), hoặc bỏ `www.rattanovi.com` khỏi `server_name` trong nginx.conf
nếu không định dùng subdomain này.

---

## Đã fix (tham khảo, không cần làm lại)

- ✅ Redirect loop vô hạn tại `location /` trong nginx.conf (redirect về chính `$host`) — đã sửa
  redirect sang domain frontend `https://rattanovi.com`.
- ✅ Docker healthcheck backend luôn fail do thiếu Spring Boot Actuator — đã thêm dependency,
  permitAll cho `/actuator/health`, cấu hình exposure, và cài `curl` trong Dockerfile runtime.
  **Lưu ý**: các fix này mới ở local, cần rebuild + redeploy lên EC2 mới có hiệu lực.
