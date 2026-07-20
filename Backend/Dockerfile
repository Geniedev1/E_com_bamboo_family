# Multi-stage build cho Spring Boot backend

# ===== Stage 1: Build =====
FROM maven:3.8-openjdk-8 AS builder
WORKDIR /app

# Copy pom.xml và download dependencies trước (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source và build (bỏ tests để nhanh hơn)
COPY src ./src
RUN mvn package -Dmaven.test.skip=true -B

# ===== Stage 2: Runtime =====
FROM eclipse-temurin:8-jre-focal
WORKDIR /app

# Tạo non-root user để bảo mật + thư mục lưu ảnh upload
RUN addgroup --system spring && adduser --system --group spring \
  && mkdir -p /app/uploads && chown -R spring:spring /app
USER spring:spring

# Copy jar từ build stage
COPY --from=builder /app/target/*.jar app.jar

# Port Spring Boot lắng nghe
EXPOSE 8080

# Chạy app
ENTRYPOINT ["java", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", \
  "app.jar"]
