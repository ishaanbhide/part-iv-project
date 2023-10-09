# Server

This folder serves as the repository containing the API server code. 

The API server is responsible for routing client HTTP requests and querying the database.

## Setup

Please make sure you have the latest version of `nodeJS` installed. Then install dependencies.

```bash
$ npm install
```

## Environment File

Create a `.env` file with the following parameters:

```
MONGODB_CONNECTION_STRING=
PORT=3001
```

Put your own MongoDB connection string value or contact us for ours.

## Development Environment

To run in a development environment.

```bash
$ npm run dev
```

If you want to run the server that serves the built `client-map` or `client-newsfeed`. Run with either:

```bash
$ npm run map
```

or

```bash
$ npm run newsfeed
```

## Build & Run

To build and run a standalone production server.

```bash
$ npm run build
$ npm run start
```

