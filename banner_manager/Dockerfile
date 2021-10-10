FROM openjdk:8

ARG JAR_FILE=target/banner_manager-?.?.?.jar
COPY ${JAR_FILE} app.jar

CMD ["java","-jar","/app.jar"]