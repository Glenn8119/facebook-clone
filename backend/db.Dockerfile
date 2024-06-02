FROM postgres:16.2-alpine

COPY ./facebook_clone/tables.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=1234
ENV POSTGRES_DB=facebook_clone