FROM eclipse-temurin:21-alpine

RUN apk add --no-cache watchexec

WORKDIR /backend

COPY --chmod=755 ./ /backend

EXPOSE 8080
EXPOSE 5005

RUN ./mvnw install -DskipTests

ENTRYPOINT ["sh", "-c"]
CMD ["./mvnw spring-boot:run & watchexec --watch src/main --restart -- scripts/recompile.sh"]