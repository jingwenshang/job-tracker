FROM maven:3.9.3-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
WORKDIR /app/job-tracker-backend
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/job-tracker-backend/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
