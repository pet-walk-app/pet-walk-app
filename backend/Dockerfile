FROM eclipse-temurin:21

WORKDIR /backend

COPY . /backend/

EXPOSE 8080
EXPOSE 5005

RUN chmod +x ./gradlew
RUN ./gradlew clean build --no-daemon


CMD ["sh", "-c", "./gradlew compileJava --continuous --parallel --build-cache --configuration-cache & ./gradlew bootRun"]