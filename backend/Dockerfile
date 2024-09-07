FROM maven:3.9.9-eclipse-temurin-21-alpine

WORKDIR /backend

COPY . /backend/

EXPOSE 8080
EXPOSE 5005

RUN mvn clean package -DskipTests

CMD ["sh", "-c", "mvn spring-boot:run"]