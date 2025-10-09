# STAGE 1: BUILD STAGE

FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn package -DskipTests

# STAGE 2: RUN STAGE

FROM eclipse-temurin:21-jdk-jammy AS final

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java","-jar","/app/target/premier-zone-0.0.1-SNAPSHOT.jar"]