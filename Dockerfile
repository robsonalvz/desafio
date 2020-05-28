FROM postgres:12
MAINTAINER Robson Alves
ENV POSTGRES_USER robsonalvz
ENV POSTGRES_DB desafio
ENV POSTGRES_PASSWORD @teste123
EXPOSE 5432

# Backend
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
COPY desafio-api/pom.xml /build/
COPY desafio-api/src /build/src/
WORKDIR /build/
RUN mvn package
FROM openjdk:8-jre-alpine
WORKDIR /app
#COPY --from=MAVEN_BUILD /build/target/desafio-0.0.1-SNAPSHOT.jar /app/
#COPY build/target/desafio-0.0.1-SNAPSHOT.jar /app/
EXPOSE 9000
# CMD ["java", "-jar", "desafio-0.0.1-SNAPSHOT.jar"]
#ENTRYPOINT ["java", "-jar", "desafio-0.0.1-SNAPSHOT.jar"]

# Frontend
FROM node:12.7-alpine as build
WORKDIR /front/
ENV PATH /front/node_modules/.bin:$PATH
COPY desafio-front/package.json /front/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY desafio-front/ /front
RUN npm run build

# Nginx
FROM nginx
RUN add-apt-repository -r ppa:webupd8team/java
RUN apt-get update && apt-get install -y apache2 && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade
RUN apt-get -y install supervisor && \
  mkdir -p /var/log/supervisor && \
  mkdir -p /etc/supervisor/conf.d
RUN mkdir /desafio
WORKDIR /desafio
COPY --from=MAVEN_BUILD /build/target/desafio-0.0.1-SNAPSHOT.jar desafio/desafio-0.0.1-SNAPSHOT.jar 
COPY --from=build /front/build /usr/share/nginx/html
EXPOSE 80

ADD supervisor.conf /etc/supervisor.conf

CMD ["supervisord", "-c", "/etc/supervisor.conf"]

