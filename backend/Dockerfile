# 1. Építési szakasz - Maven-t használunk a build-hez
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Forráskód és Maven projektfájlok másolása
COPY pom.xml .
COPY src ./src

# Maven build, tesztek kihagyása a gyorsabb build érdekében
RUN mvn clean package -DskipTests

# 2. Futtatási szakasz - csak a szükséges JAR fájlt másoljuk át
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Jar fájl másolása a build szakaszból
COPY --from=build /app/target/*.jar app.jar

# Port megnyitása
EXPOSE 8080

# Futtatás parancs beállítása
ENTRYPOINT ["java", "-jar", "app.jar"]
