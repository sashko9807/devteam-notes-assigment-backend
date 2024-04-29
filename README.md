# React + TypeScript + Vite

## Perequisites

- Node.JS
- Docker

## About

RESTful service, to accomodate (Notes App)[https://github.com/sashko9807/devteam-notes-assigment-frontend]

## TODO

1. Add integration tests for each controller
2. Improve the existing implementation, by attaching notes to rooms, rather than user. This would allow for users to share notes across room sessions
3. Implement authorization, by adding user roles, as well as scopes

## Instructions

1. Run `docker compose up`, to create a PostgreSQL instance
2. Run `yarn install`
3. Run `yarn prisma migrate dev`
4. Run `yarn seed`
5. Run `yarn dev`
