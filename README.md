# TodoListExamination

✨ **Todo List Application with Authentication** ✨

## Tech Stack

- NodeJS (https://nodejs.org/en)

- Nrwl/nx (https://nx.dev) - for Monorepo

- NestJs (https://nestjs.com)

- MongoDB (https://www.mongodb.com)

- Jest (https://jestjs.io) - for Testing

## Start the app

Make sure to install NodeJS enviroment first,see here: https://nodejs.org/en. Also, MongoDB server is a requirement, see installation instructions here: https://www.mongodb.com/try/download/community, can also be installed via Docker (https://hub.docker.com/_/mongo)

Install the dependencies first, run `npm i / npm install`.

To start the development server run `npm run dev:todo`.

To build the application run `npm run build:todo`.

To start the production-build application run `npm run prod-start:todo`.

To run unit tests, `npm run test:public-api`

## Application Architecture Structure

This Todo List Application follows @nrwl/nx monorepo folder structures

```
./root
	|- apps
	|- libs
		|- ...reusable codes
	|- etc...
```

As one of advantages from a monorepo structure, the system allows building multiple projects inside the `app` with shared resources from `libs`.
