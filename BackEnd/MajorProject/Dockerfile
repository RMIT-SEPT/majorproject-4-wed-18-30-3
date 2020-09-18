FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
ARG DEMO_TESTS=target/test-classes/labwed18303/demo/*.class
ARG WEB_TESTS=target/test-classes/labwed18303/demo/web/*.class
COPY ${JAR_FILE} app.jar
COPY ${DEMO_TESTS} test-classes/labwed18303/demo/
COPY ${DEMO_TESTS} test-classes/labwed18303/demo/web/
ENTRYPOINT ["java", "-jar", "app.jar"]