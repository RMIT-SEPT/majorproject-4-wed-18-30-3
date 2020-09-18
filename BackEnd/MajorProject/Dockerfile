FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
ARG TEST_FILES=target/test-classes/*
COPY ${JAR_FILE} app.jar
COPY ${TEST_FILES} ./
ENTRYPOINT ["java", "-jar", "app.jar"]