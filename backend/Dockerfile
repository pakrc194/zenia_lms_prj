# # ─────────────────────────────────────────
# # Stage 1 : Build
# # ─────────────────────────────────────────
# FROM eclipse-temurin:21-jdk-jammy AS builder

# WORKDIR /app

# COPY . .
# RUN chmod +x gradlew && ./gradlew bootJar

# # ─────────────────────────────────────────
# # Stage 2 : Runtime
# # ─────────────────────────────────────────
# FROM eclipse-temurin:21-jre-jammy

# WORKDIR /app

# COPY --from=builder /app/build/libs/*.jar app.jar

# EXPOSE 8080

# ENTRYPOINT ["java", "-jar", "app.jar"]


# Dockerfile.dev
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

COPY gradlew gradlew
COPY gradle gradle
COPY build.gradle settings.gradle ./
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon  # 의존성만 먼저 캐시

EXPOSE 8080
CMD ["./gradlew", "bootRun"] 