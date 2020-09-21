FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY mvnw ./
COPY .mvn/ .mvn/
COPY target/test-classes/ test-classes/
COPY pom.xml ./
ENTRYPOINT ["java", "-jar", "app.jar"]